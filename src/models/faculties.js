import { DataTypes } from "sequelize";
import { sequelize } from "../database/db.js";

// Definición del modelo facultades
export const Faculty = sequelize.define("faculties", {
  // Id identificador de la facultad
  id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    allowNull: false,
    primaryKey: true,
  },
  // Nombre de la facultad
  university_name: {
    type: DataTypes.STRING(40),
    allowNull: false,
    unique: true,
  },
});
