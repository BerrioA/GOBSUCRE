import app from "./app.js";
import { sequelize } from "./database/db.js";
import "./models/relations.js";
import { seedDependencias } from "./models/relations.js";

async function main() {
  try {
    //  await sequelize.authenticate();
    //  console.log(
    //    "✅ La conexión con la base de datos se ha realizado con éxito."
    //  );

    // Sincronizar base de datos (eliminar y recrear todas las tablas)
    //  await sequelize.sync({ force: true });

    // Ejecutar el hook para sembrar los datos
    // await seedDependencias();

    //Este comando permite realizar cambios en la base de datos sin perder algunos campos de registro dentro de esta misma
    // await sequelize.sync({ alter: true });

    const PORT = process.env.PORT || 3000;
    app.listen(PORT, () => {
      console.log(`Servidor corriendo en el puerto ${PORT}`);
      console.log(
        `Documentación GOBSUCRE disponible en: http://localhost:${PORT}/api/gobsucre/v1/documentation`
      );
    });
    console.log("✅ Servidor corriendo en el puerto:", PORT);
  } catch (error) {
    console.log(
      "❌ Error al intentar establecer la conexión con la base de datos."
    );

    console.log(error);
  }
}
main();
