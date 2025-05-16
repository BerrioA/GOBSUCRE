import { Rol } from "./roles.js";
import { User } from "./users.js";
import { Address } from "./address.js";
import { PractitionerInformation } from "./practitionerInformation.js";
import { Secretary } from "./secretary.js";
import { Undersecretary } from "./undersecretary.js";
import { Institution } from "./institutions.js";
import { Faculty } from "./faculties.js";
import { Program } from "./programs.js";
import { Document } from "./documents.js";
import { DocumentType } from "./documentTypes.js";

// Usuario - Rol
Rol.hasMany(User, { foreignKey: "rolId" });
User.belongsTo(Rol, { foreignKey: "rolId" });

// Usuario - Dirección
User.hasOne(Address, { foreignKey: "userId" });
Address.belongsTo(User, { foreignKey: "userId" });

// Tipo de documentos - Documentos
DocumentType.hasMany(Document, { foreignKey: "documentTypesId" });
Document.belongsTo(DocumentType, { foreignKey: "documentTypesId" });

// Usuario - Documentos
User.hasMany(Document, { foreignKey: "userId" });
Document.belongsTo(User, { foreignKey: "userId" });

// Usuario - Información del practicante
User.hasOne(PractitionerInformation, { foreignKey: "userId" });
PractitionerInformation.belongsTo(User, { foreignKey: "userId" });

// Institución - Facultad
Institution.hasMany(Faculty, { foreignKey: "institutionId" });
Faculty.belongsTo(Institution, { foreignKey: "institutionId" });

// Facultad - Programa
Faculty.hasMany(Program, { foreignKey: "facultyId" });
Program.belongsTo(Faculty, { foreignKey: "facultyId" });

// Relaciones del practicante
Program.hasMany(PractitionerInformation, { foreignKey: "programId" });
PractitionerInformation.belongsTo(Program, { foreignKey: "programId" });

Faculty.hasMany(PractitionerInformation, { foreignKey: "facultyId" });
PractitionerInformation.belongsTo(Faculty, { foreignKey: "facultyId" });

Institution.hasMany(PractitionerInformation, { foreignKey: "institutionId" });
PractitionerInformation.belongsTo(Institution, { foreignKey: "institutionId" });

// Relación corregida entre Secretary y Undersecretary
Secretary.hasMany(Undersecretary, {
  foreignKey: "secretaryCode",
  sourceKey: "code",
});
Undersecretary.belongsTo(Secretary, {
  foreignKey: "secretaryCode",
  targetKey: "code",
});

// Datos de secretarías y subsecretarías
const dependencias = [
  { codigo: 10, nombre: "DESPACHO DEL GOBERNADOR DE SUCRE" },
  { codigo: 11, nombre: "OFICINA JURÍDICA" },
  { codigo: 12, nombre: "OFICINA DE CONTROL INTERNO DE GESTIÓN" },
  { codigo: 13, nombre: "OFICINA DE CONTROL INTERNO DISCIPLINARIO" },
  { codigo: 14, nombre: "OFICINA DE MACROPROYECTOS ESTRATÉGICOS" },
  {
    codigo: 15,
    nombre:
      "UNIDAD ADMINISTRATIVA DE RIESGOS, ATENCIÓN DE DESASTRES Y CAMBIO CLIMÁTICO",
  },
  {
    codigo: 16,
    nombre: "OFICINA DE TECNOLOGÍAS DE LA INFORMACIÓN TI",
  },
  { codigo: 20, nombre: "SECRETARÍA PRIVADA" },
  { codigo: 30, nombre: "SECRETARÍA  GENERAL" },
  { codigo: 31, nombre: "SUBSECRETARÍA DE LA CONTRATACIÓN" },
  { codigo: 32, nombre: "SUBSECRETARÍA DE TALENTO HUMANO" },
  { codigo: 33, nombre: "SUBSECRETARÍA DE RECURSOS FÍSICOS" },
  { codigo: 40, nombre: "SECRETARÍA  COMUNICACIONES" },
  { codigo: 50, nombre: "SECRETARÍA  HACIENDA" },
  { codigo: 51, nombre: "SUBSECRETARÍA TRIBUTARIA" },
  { codigo: 52, nombre: "SUBSECRETARÍA FINANCIERA" },
  { codigo: 60, nombre: "SECRETARÍA DE EDUCACIÓN" },
  { codigo: 61, nombre: "SUBSECRETARÍA TÉCNICA Y PEGADÓGICA" },
  { codigo: 70, nombre: "SECRETARÍA  DE PLANEACIÓN" },
  { codigo: 71, nombre: "SUBSECRETARÍA DE INVERSIÓN TERRITORIAL" },
  {
    codigo: 72,
    nombre: "SUBSECRETARÍA DE LA INFORMACIÓN Y EVALUACIÓN INSTITUCIONAL",
  },
  {
    codigo: 73,
    nombre: "SUBSECRETARÍA DE REGALÍAS Y OTRAS FUENTES DE INVERSIÓN",
  },
  { codigo: 80, nombre: "SECRETARÍA  DE SALUD" },
  { codigo: 81, nombre: "SUBSECRETARÍA DE SALUD PÚBLICA" },
  { codigo: 82, nombre: "SUBSECRETARÍA DE PRESTACIÓN DE SERVICIOS" },
  { codigo: 83, nombre: "SUBSECRETARÍA ADMINISTRATIVA Y FINANCIERA" },
  {
    codigo: 90,
    nombre: "SECRETARÍA  DE LA INCLUSIÓN SOCIAL, MUJER Y EQUIDAD DE GÉNERO",
  },
  { codigo: 91, nombre: "SUBSECRETARÍA DE INCLUSIÓN SOCIAL" },
  { codigo: 92, nombre: "SUBSECRETARÍA DE EQUIDAD DE GÉNERO" },
  { codigo: 93, nombre: "SUBSECRETARÍA DE JUVENTUDES" },
  { codigo: 100, nombre: "SECRETARÍA DE INFRAESTRUCTURA" },
  { codigo: 101, nombre: "SUBSECRETARÍA DE HABITAT" },
  {
    codigo: 110,
    nombre: "SECRETARÍA DE DESARROLLO ECONÓMICO Y MEDIO AMBIENTE",
  },
  {
    codigo: 111,
    nombre: "SUBSECRETARÍA DEL DESARROLLO RURAL Y DEL MEDIO AMBIENTE",
  },
  {
    codigo: 112,
    nombre: "SUBSECRETARÍA DE LA PRODUCTIVIDAD Y LA INNOVACIÓN",
  },
  { codigo: 120, nombre: "SECRETARÍA DEL INTERIOR" },
  { codigo: 121, nombre: "SUBSECRETARÍA DE LA SEGURIDAD TERRITORIAL" },
  {
    codigo: 122,
    nombre: "SUBSECRETARÍA DEL POSCONFLICTO Y DE LA PARTICIPACIÓN CIUDADANA",
  },
  { codigo: 130, nombre: "SECRETARÍA DE TRANSITO Y TRANSPORTE" },
  { codigo: 140, nombre: "SECRETARÍA DE ENERGÍAS" },
  { codigo: 150, nombre: "FONDO MIXTO DE CULTURA" },
  { codigo: 160, nombre: "PLAN DEPARTAMENTAL DE AGUAS" },
  { codigo: 170, nombre: "ESCUELA DE BELLAS ARTES Y HUMANIDADES" },
  { codigo: 180, nombre: "INSTITUTO DEPARTAMENTAL DE DEPORTES Y RECREACIÓN" },
];

// Función para separar secretarías y subsecretarías
const procesarDependencias = () => {
  const secretarias = dependencias.filter((dep) => dep.codigo % 10 === 0);
  const subsecretarias = dependencias.filter((dep) => dep.codigo % 10 !== 0);

  return { secretarias, subsecretarias };
};

// Hook para insertar datos después de la sincronización
export const seedDependencias = async () => {
  try {
    const { secretarias, subsecretarias } = procesarDependencias();

    // Insertar secretarías
    for (const secretaria of secretarias) {
      await Secretary.findOrCreate({
        where: { code: secretaria.codigo },
        defaults: {
          code: secretaria.codigo,
          secretary_name: secretaria.nombre,
        },
      });
    }

    // Insertar subsecretarías
    for (const subsecretaria of subsecretarias) {
      // Determinar a qué secretaría pertenece
      const secretaryCode = Math.floor(subsecretaria.codigo / 10) * 10;

      await Undersecretary.findOrCreate({
        where: { code: subsecretaria.codigo },
        defaults: {
          code: subsecretaria.codigo,
          undersecretary_name: subsecretaria.nombre,
          secretaryCode: secretaryCode,
        },
      });
    }

    console.log(
      "Datos de secretarías y subsecretarías insertados correctamente"
    );
  } catch (error) {
    console.error("Error al insertar datos de dependencias:", error);
  }
};
