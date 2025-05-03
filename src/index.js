import app from "./app.js";
// import { sequelize } from "./database/database.js";
// import "./models/models-relations.js";

async function main() {
  try {
    //await sequelize.authenticate();
    //console.log("Conexión establedica con exito a la base de datos!");

    //Este comando permite realizar cambios en la base de datos de manera forzada
    //await sequelize.sync({ force: true });

    //Este comando permite realizar cambios en la base de datos sin perder algunos campos de registro dentro de esta misma
    //await sequelize.sync({ alter: true });

    const PORT = process.env.PORT || 3000;
    app.listen(PORT);
    console.log("✅ Servidor corriendo en el puerto:", PORT);
  } catch (error) {
    console.log(
      "❌ Error al intentar establecer la conexión con la base de datos."
    );

    console.log(error);
  }
}
main();
