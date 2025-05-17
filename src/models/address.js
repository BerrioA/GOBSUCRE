import { DataTypes } from "sequelize";
import { sequelize } from "../database/db.js";
import { User } from "./users.js";

// Definición del modelo de direcciones
export const Address = sequelize.define("addresses", {
  // Id identificador de las direcciones
  id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    allowNull: false,
    primaryKey: true,
  },
  // Barrio del usuario
  neighborhood: {
    type: DataTypes.STRING(50),
    allowNull: false,
  },
  // Dirección del usuario
  address: {
    type: DataTypes.STRING(100),
    allowNull: false,
  },
  // Ciudad del usuario
  city: {
    type: DataTypes.STRING(50),
    allowNull: false,
  },
  // Departamento del usuario
  department: {
    type: DataTypes.STRING(50),
    allowNull: false,
  },
  // Id del usuario al que pertenece la dirección
  userId: {
    type: DataTypes.UUID,
    allowNull: false,
    references: {
      model: User,
      key: "id",
    },
  },
});
