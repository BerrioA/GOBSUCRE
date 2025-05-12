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
  { codigo: 12, nombre: "OFICINA DE CONTROL INTERNO DISCIPLINARIO" },
  { codigo: 20, nombre: "SECRETARÍA DE GOBIERNO" },
  { codigo: 21, nombre: "SUBSECRETARÍA DE CONVIVENCIA CIUDADANA" },
  { codigo: 22, nombre: "SUBSECRETARÍA DE ASUNTOS RELIGIOSOS" },
  { codigo: 30, nombre: "SECRETARÍA DE HACIENDA" },
  { codigo: 31, nombre: "SUBSECRETARÍA DE PRESUPUESTO" },
  { codigo: 32, nombre: "SUBSECRETARÍA DE TESORERÍA" },
  { codigo: 40, nombre: "SECRETARÍA DE INFRAESTRUCTURA" },
  { codigo: 41, nombre: "SUBSECRETARÍA DE VIVIENDA" },
  { codigo: 42, nombre: "SUBSECRETARÍA DE OBRAS" },
  { codigo: 50, nombre: "SECRETARÍA DE SALUD" },
  { codigo: 51, nombre: "SUBSECRETARÍA DE PROMOCIÓN Y PREVENCIÓN EN SALUD" },
  { codigo: 60, nombre: "SECRETARÍA DE EDUCACIÓN" },
  { codigo: 61, nombre: "SUBSECRETARÍA DE CALIDAD EDUCATIVA" },
  { codigo: 62, nombre: "SUBSECRETARÍA DE COBERTURA EDUCATIVA" },
  { codigo: 70, nombre: "SECRETARÍA DE DESARROLLO ECONÓMICO Y MEDIO AMBIENTE" },
  { codigo: 71, nombre: "SUBSECRETARÍA DE MEDIO AMBIENTE" },
  { codigo: 72, nombre: "SUBSECRETARÍA DE DESARROLLO AGROPECUARIO" },
  { codigo: 73, nombre: "SUBSECRETARÍA DE INDUSTRIA Y COMERCIO" },
  { codigo: 80, nombre: "SECRETARÍA DE ASUNTOS SOCIALES" },
  { codigo: 81, nombre: "SUBSECRETARÍA DE POBLACIONES VULNERABLES" },
  { codigo: 90, nombre: "SECRETARÍA ADMINISTRATIVA" },
  { codigo: 91, nombre: "SUBSECRETARÍA DE TALENTO HUMANO" },
  { codigo: 92, nombre: "SUBSECRETARÍA DE CONTRATACIÓN" },
  { codigo: 100, nombre: "SECRETARÍA GENERAL" },
  { codigo: 101, nombre: "SUBSECRETARÍA DE GESTIÓN DOCUMENTAL" },
  { codigo: 102, nombre: "SUBSECRETARÍA DE TECNOLOGÍA DE LA INFORMACIÓN" },
  { codigo: 110, nombre: "OFICINA DE PLANEACIÓN" },
  { codigo: 111, nombre: "SUBSECRETARÍA DE DESARROLLO TERRITORIAL" },
  { codigo: 120, nombre: "OFICINA DE CONTROL INTERNO" },
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
