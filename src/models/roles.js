import { DataTypes } from "sequelize";
import { sequelize } from "../database/db.js";

// Definición del modelo de roles
export const Rol = sequelize.define("roles", {
  // Id identificador de los roles
  id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    allowNull: false,
    primaryKey: true,
  },
  // Nombre del rol
  role_name: {
    type: DataTypes.STRING(10),
    allowNull: false,
    unique: true,
  },
});

// Hook para insertar roles después de sincronizar la tabla
Rol.afterSync(async () => {
  const roles = ["Admin", "Estudiante"];
  await Rol.bulkCreate(
    roles.map((role) => ({ role_name: role })),
    { ignoreDuplicates: true }
  );
});
