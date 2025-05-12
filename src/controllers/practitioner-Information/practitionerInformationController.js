import { PractitionerInformation } from "../../models/practitionerInformation.js";
import { User } from "../../models/users.js";

// Controlador encargado de obtener toda la informacion de los practicantes
export const getPractitionerInformation = async (req, res) => {
  try {
    const information = await PractitionerInformation.findAll();

    return res.status(200).json(information);
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
    const { institutionId, FacultyId, programId, start_date } = req.body;

    const practitioner = await User.findByPk(userId);
    if (!practitioner) return res.status(404).json("Estudiante no encontrado.");

    await PractitionerInformation.create({
      userId,
      institutionId,
      FacultyId,
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

    const information = await User.findByPk(informationId);
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
