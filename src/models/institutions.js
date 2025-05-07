import { DataTypes } from "sequelize";
import { sequelize } from "../database/db.js";

// Definición del modelo instituciones o universidades
export const Institution = sequelize.define("institutions", {
  // Id identificador de la institución
  id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    allowNull: false,
    primaryKey: true,
  },
  // Nombre de la universidad o corporación
  university_name: {
    type: DataTypes.STRING(40),
    allowNull: false,
    unique: true,
  },
  // Código de la universidad o corporación
  code: {
    type: DataTypes.STRING(20),
    allowNull: false,
    unique: true,
  },
});

// Hook para insertar tipos de documentos después de sincronizar la tabla
// DocumentType.afterSync(async () => {
//   const types = [
//     "Hoja de vida",
//     "Contraloría",
//     "Procuraduría",
//     "SISBEN",
//     "ADRES",
//     "Primer documento jurídico",
//     "Segundo documento jurídico",
//   ];
//   await DocumentType.bulkCreate(
//     types.map((type) => ({ document_name: type })),
//     { ignoreDuplicates: true }
//   );
// });
