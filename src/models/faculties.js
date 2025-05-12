import { DataTypes } from "sequelize";
import { sequelize } from "../database/db.js";
import { Institution } from "./institutions.js";

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
  faculty_name: {
    type: DataTypes.STRING(200),
    allowNull: false,
  },
  // Id de la institucion
  institutionId: {
    type: DataTypes.UUID,
    allowNull: false,
    references: {
      model: Institution,
      key: "id",
    },
  },
});
