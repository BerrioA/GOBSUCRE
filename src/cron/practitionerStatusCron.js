// src/cron/practitionerStatusCron.js
import cron from "node-cron";
import moment from "moment";
import { Op } from "sequelize";
import { sequelize } from "../database/db.js";
import { PractitionerInformation } from "../models/practitionerInformation.js";

// Función que realiza las actualizaciones
export async function updatePractitionerStatuses() {
  const today = moment().startOf("day").toDate();

  const lockKey = 987654321;
  const [lockResult] = await sequelize.query(
    `SELECT pg_try_advisory_lock(${lockKey}) AS acquired;`
  );
  const acquired = lockResult?.[0]?.acquired;
  if (!acquired) {
    console.log(
      "Otra instancia está ejecutando la tarea. Abortando ejecución actual."
    );
    return;
  }

  const t = await sequelize.transaction();
  try {
    // 1) Activar aquellos cuya start_date <= hoy y que sigan "Pendiente de inicio"
    const [activatedCount, activatedRows] =
      await PractitionerInformation.update(
        { status: "activo" },
        {
          where: {
            status: "Pendiente de inicio",
            start_date: { [Op.lte]: today },
          },
          returning: true, // Postgres devuelve las filas actualizadas
          transaction: t,
        }
      );

    // 2) Finalizar aquellos cuyo end_date < hoy y que no estén "Finalizado"
    const [finalizedCount, finalizedRows] =
      await PractitionerInformation.update(
        { status: "Finalizado" },
        {
          where: {
            status: { [Op.not]: "Finalizado" },
            end_date: { [Op.lt]: today },
          },
          returning: true,
          transaction: t,
        }
      );

    await t.commit();

    console.log(
      `Cron: Activos actualizados: ${activatedCount}`,
      activatedRows?.map((r) => r.id)
    );
    console.log(
      `Cron: Finalizados actualizados: ${finalizedCount}`,
      finalizedRows?.map((r) => r.id)
    );
  } catch (error) {
    await t.rollback();
    console.error("Error en updatePractitionerStatuses:", error);
    throw error;
  } finally {
    // liberar el advisory lock
    await sequelize.query(`SELECT pg_advisory_unlock(${lockKey});`);
  }
}

// Programar la tarea: aquí se ejecuta cada día a la medianoche.
// Cambia la expresión cron si quieres otra frecuencia (ej. cada hora: "0 * * * *")
cron.schedule("0 0 * * *", () => {
  console.log(
    "Cron: iniciando verificación de practicantes",
    new Date().toISOString()
  );
  updatePractitionerStatuses().catch((err) =>
    console.error("Cron error:", err)
  );
});

// Ejecuta una vez al arrancar el servidor para no esperar al primer cron
updatePractitionerStatuses().catch((err) =>
  console.error("Inicial run error:", err)
);
