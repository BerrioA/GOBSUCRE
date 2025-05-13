import { Faculty } from "../../models/faculties.js";
import { Institution } from "../../models/institutions.js";
import { PractitionerInformation } from "../../models/practitionerInformation.js";
import { Program } from "../../models/programs.js";
import { User } from "../../models/users.js";

// Controlador encargado de obtener toda la informacion de los practicantes
export const getPractitionerInformation = async (req, res) => {
  try {
    const information = await PractitionerInformation.findAll({
      include: [
        { model: Institution, attributes: ["university_name"] },
        { model: Faculty, attributes: ["faculty_name"] },
        { model: Program, attributes: ["program_name"] },
      ],
    });

    const infoStudent = information.map((item) => {
      return {
        id: item.id,
        start_date: item.start_date,
        status: item.status,
        university_name: item.institution?.university_name,
        faculty_name: item.faculty?.faculty_name,
        program_name: item.program?.program_name,
      };
    });

    return res.status(200).json(infoStudent);
  } catch (error) {
    console.log(
      "Se ha producido un error al intentar obtener los datos de los practicantes:",
      error
    );
  }

  return res.status(500).json({
    error:
      "Se ha producido un error al intentar obtener los datos de los practicantes.",
  });
};

// Controlador encargado de registrar la informacion de un practicante
export const registerPractitionerInformation = async (req, res) => {
  try {
    const { userId } = req.params;
    const { institutionId, facultyId, programId, start_date } = req.body;

    const practitioner = await User.findByPk(userId);
    if (!practitioner) return res.status(404).json("Estudiante no encontrado.");

    await PractitionerInformation.create({
      userId,
      institutionId,
      facultyId,
      programId,
      start_date,
    });

    return res
      .status(201)
      .json("Informacion del practicante registrada con exito.");
  } catch (error) {
    console.log(
      "Se ha presentado un error al intentar rgistrar la informacion del practicante:",
      error
    );

    return res.status(500).json({
      error:
        "Se ha presentado un error al intentar rgistrar la informacion del practicante",
    });
  }
};

// Controlador encargado de actualizar la informacion de un practicante
export const updatePractitionerInformation = async (req, res) => {
  try {
    const { informationId } = req.params;
    const { institutionId, FacultyId, programId, start_date } = req.body;

    const information = await PractitionerInformation.findByPk(informationId);
    if (!information)
      return res
        .status(404)
        .json("No se ha encontrado la informacion del estudiante.");

    information.institutionId = institutionId;
    information.FacultyId = FacultyId;
    information.programId = programId;
    information.start_date = start_date;

    await information.save();

    return res
      .status(201)
      .json("Informacion del practicante actualizada con exito.");
  } catch (error) {
    console.log(
      "Se ha presentado un error al intentar actualizar la informacion del practicante:",
      error
    );

    return res.status(500).json({
      error:
        "Se ha presentado un error al intentar actualizar la informacion del practicante.",
    });
  }
};

// Controlador encargado de eliminar la informacion de un practicante
export const deletePractitionerInformation = async (req, res) => {
  try {
    const { informationId } = req.params;

    const information = await PractitionerInformation.findByPk(informationId);
    if (!information)
      return res
        .status(404)
        .json("No se ha encontrado la informacion del estudiante.");

    await information.destroy();

    return res
      .status(201)
      .json("Informacion del practicante eliminada con exito.");
  } catch (error) {
    console.log(
      "Se ha presentado un error al intentar eliminar la informacion del practicante:",
      error
    );

    return res.status(500).json({
      error:
        "Se ha presentado un error al intentar eliminar la informacion del practicante",
    });
  }
};
