import { DataTypes } from "sequelize";
import { sequelize } from "../database/db.js";

export const Secretary = sequelize.define("secretaries", {
  id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    allowNull: false,
    primaryKey: true,
  },
  code: {
    type: DataTypes.INTEGER,
    allowNull: false,
    unique: true,
  },
  secretary_name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
});
