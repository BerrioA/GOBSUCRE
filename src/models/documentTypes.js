import { DataTypes } from "sequelize";
import { sequelize } from "../database/db.js";

// Definición del modelo de tipos de documentos
export const DocumentType = sequelize.define("document_types", {
  // Id identificador de los typos de codumentos
  id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    allowNull: false,
    primaryKey: true,
  },
  // Nombre del tipo de documento
  document_name: {
    type: DataTypes.STRING(100),
    allowNull: false,
    unique: true,
  },
});

// Hook para insertar tipos de documentos después de sincronizar la tabla
DocumentType.afterSync(async () => {
  const types = [
    "Hoja de vida",
    "Contraloría",
    "Procuraduría",
    "SISBEN",
    "ADRES",
    "Primer documento jurídico",
    "Segundo documento jurídico",
  ];
  await DocumentType.bulkCreate(
    types.map((type) => ({ document_name: type })),
    { ignoreDuplicates: true }
  );
});
