import { DataTypes } from "sequelize";
import { sequelize } from "../database/db.js";
import { User } from "./users.js";
import { Institution } from "./institutions.js";
import { Faculty } from "./faculties.js";
import { Program } from "./programs.js";
import { Secretary } from "./secretary.js";
import { Undersecretary } from "./undersecretary.js";

// Definición del modelo de información del practicante
export const PractitionerInformation = sequelize.define("practitioner_informations", {
  // Id identificador de la información del practicante
  id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    allowNull: false,
    primaryKey: true,
  },
  // Id de la universidad o institucion a la que pertenece el practicante
  institutionId: {
    type: DataTypes.UUID,
    allowNull: false,
    references: {
      model: Institution,
      key: "id",
    },
  },
  // Id de la facultad de la universidad o institucion a la que pertenece el practicante
  facultyId: {
    type: DataTypes.UUID,
    allowNull: false,
    references: {
      model: Faculty,
      key: "id",
    },
  },
  // Id del programa o carrera a la que pertenece el practicante
  programId: {
    type: DataTypes.UUID,
    allowNull: false,
    references: {
      model: Program,
      key: "id",
    },
  },
  // Fecha de inicio de practica
  start_date: {
    type: DataTypes.DATE,
    allowNull: false,
  },
  // Fecha de finalización de practica
  end_date: {
    type: DataTypes.DATE,
    allowNull: false,
  },
  // Id de la dependencia a la cual sera asignado el estudiante
  secretaryId: {
    type: DataTypes.UUID,
    allowNull: true,
    references: {
      model: Secretary,
      key: "id",
    },
  },
  // Id de la subdependencia a la cual sera asignado el estudiante
  undersecretaryId: {
    type: DataTypes.UUID,
    allowNull: true,
    references: {
      model: Undersecretary,
      key: "id",
    },
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
  // Id del estudiante al que pertenece la inforacion del practicas
  userId: {
    type: DataTypes.UUID,
    allowNull: false,
    references: {
      model: User,
      key: "id",
    },
  },
});
