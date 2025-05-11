import { DataTypes } from "sequelize";
import { sequelize } from "../database/db.js";
import { Rol } from "./roles.js";

export const User = sequelize.define("users", {
  // Id identificador de los Usuarios
  id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    unique: true,
    allowNull: false,
    primaryKey: true,
  },
  // Nombre del usuario
  name: {
    type: DataTypes.STRING(40),
    allowNull: false,
  },
  // Segúndo nombre del usuario
  middle_name: {
    type: DataTypes.STRING(40),
    allowNull: true,
  },
  // Primer apellido del usuario
  last_name: {
    type: DataTypes.STRING(40),
    allowNull: false,
  },
  // Segundo apellido del usuario
  second_last_name: {
    type: DataTypes.STRING(40),
    allowNull: false,
  },
  //Tipo de documento de identidad del usuario
  document_type: {
    type: DataTypes.ENUM("CC", "TI"),
    allowNull: false,
  },
  // Número de documento de identidad del usuario
  document_number: {
    type: DataTypes.STRING(10),
    allowNull: false,
    unique: true,
    validate: {
      isNumeric: true,
      len: [7, 10],
    },
  },
  // Celular del usuario
  cellphone: {
    type: DataTypes.STRING(10),
    allowNull: false,
    validate: {
      isNumeric: true,
      len: [10, 10],
    },
  },
  // Correo del usuario
  email: {
    type: DataTypes.STRING(150),
    allowNull: false,
    unique: true,
  },
  // Contraseña del usuario
  password: {
    type: DataTypes.STRING(150),
    allowNull: false,
  },
  // Rol del usuario
  rolId: {
    type: DataTypes.UUID,
    allowNull: true,
  },
  // Estado del usuario
  status: {
    type: DataTypes.ENUM(
      "Pendiente de inicio",
      "activo",
      "inactivo",
      "Finalizado"
    ),
    defaultValue: "Pendiente de inicio",
  },
  // Verificación del usuario
  isVerified: {
    type: DataTypes.BOOLEAN,
    defaultValue: true,
  },
  // Codigo de verificación del usuario
  verificationCode: {
    type: DataTypes.STRING(150),
  },
  // Última vez que se envió el correo de verificación
  lastResendTime: {
    type: DataTypes.DATE,
    allowNull: true,
  },
  // Contador de reenvios del correo de verificación
  resendCount: {
    type: DataTypes.INTEGER,
    defaultValue: 0,
  },
});

// Hook para asignar automáticamente el rol de Estudiante a nuevos usuarios
User.beforeCreate(async (user) => {
  if (!user.rolId) {
    try {
      // Buscar el rol de Estudiante
      const estudianteRol = await Rol.findOne({
        where: { role_name: "Estudiante" },
      });

      if (estudianteRol) {
        user.rolId = estudianteRol.id;
      } else {
        console.error("No se encontró el rol de Estudiante");
      }
    } catch (error) {
      console.error("Error al asignar rol por defecto:", error);
    }
  }
});
