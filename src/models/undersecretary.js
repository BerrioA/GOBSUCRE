import { DataTypes } from "sequelize";
import { sequelize } from "../database/db.js";
import { Secretary } from "./secretary.js";

export const Undersecretary = sequelize.define("undersecretaries", {
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
  undersecretary_name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  secretaryCode: {
    type: DataTypes.INTEGER,
    references: {
      model: Secretary,
      key: "code",
    },
  },
});
