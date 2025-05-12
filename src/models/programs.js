import { DataTypes } from "sequelize";
import { sequelize } from "../database/db.js";
import { Faculty } from "./faculties.js";

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
    type: DataTypes.STRING(150),
    allowNull: false,
  },
  code: {
    type: DataTypes.STRING(10),
    allowNull: false,
    validate: {
      isNumeric: true,
    },
  },
  // Id de la facultad
  facultyId: {
    type: DataTypes.UUID,
    allowNull: false,
    references: {
      model: Faculty,
      key: "id",
    },
  },
});
