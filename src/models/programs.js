import { DataTypes } from "sequelize";
import { sequelize } from "../database/db.js";

// Definición del modelo Programas
export const Program = sequelize.define("programs", {
  // Id identificador del programa
  id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    allowNull: false,
    primaryKey: true,
  },
  // Nombre del programa
  program_name: {
    type: DataTypes.STRING(40),
    allowNull: false,
  },
  code: {
    type: DataTypes.STRING(10),
    allowNull: false,
    validate: {
      isNumeric: true,
    },
  },
});
