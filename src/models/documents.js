import { DataTypes } from "sequelize";
import { sequelize } from "../database/db.js";
import { DocumentType } from "./documentTypes.js";
import { User } from "./users.js";

// Definición del modelo Documentos
export const Document = sequelize.define("documents", {
  // Id identificador de los documentos
  id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    allowNull: false,
    primaryKey: true,
  },
  // Id identificador del tipo de documento
  documentTypesId: {
    type: DataTypes.UUID,
    allowNull: false,
    references: {
      model: DocumentType,
      key: "id",
    },
  },
  // Nombre del documento en el sistema
  document: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  fileUrl: {
    type: DataTypes.STRING(250),
    allowNull: false,
  },
  // Nombre original del documento
  originalName: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  // Tamaño del archivo en bytes del documento
  fileSize: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  // Tipo MIME del archivo
  mimeType: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  // Id del usuario al que pertenece el documento
  userId: {
    type: DataTypes.UUID,
    allowNull: false,
    references: {
      model: User,
      key: "id",
    },
  },
});
