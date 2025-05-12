import { Faculty } from "../../models/faculties.js";
import { Institution } from "../../models/institutions.js";

// Controlador encargado de obtener todas las facultades
export const getFaculties = async (req, res) => {
  try {
    const faculties = await Faculty.findAll({
      include: ["id", "faculty_name", "institutionId"],
    });

    return res.status(200).json(faculties);
  } catch (error) {
    console.log(
      "Se ha presentado un error al intenter optener las facultades:",
      error
    );

    return res.status(500).json({
      error: "Se ha presentado un error al intenter optener las facultades.",
    });
  }
};

// Controlador encargado de registrar una Facultad
export const registerFaculty = async (req, res) => {
  try {
    const { faculty_name, institutionId } = req.body;

    await Faculty.create({ faculty_name, institutionId });

    return res.status(200).json({ message: "Facultad registrada con exito." });
  } catch (error) {
    console.log(
      "Se ha presentado un error al intenter registrar la facultad:",
      error
    );

    return res.status(500).json({
      error: "Se ha presentado un error al intenter registrar la facultad.",
    });
  }
};

// Controlador encargado de actualizar una facultad
export const updateFaculty = async (req, res) => {
  try {
    const { facultyId } = req.params;
    const { university_name, code } = req.body;

    const faculty = await Faculty.findByPk(facultyId);
    if (!faculty)
      return res.status(404).json({ error: "Facultad no encontrada." });

    faculty.university_name = university_name;
    faculty.code = code;

    await faculty.save();

    return res.status(200).json({ message: "Facultad actualizada con exito." });
  } catch (error) {
    console.log(
      "Se ha presentado un error al intenter actualizar la Facultad:",
      error
    );

    return res.status(500).json({
      error: "Se ha presentado un error al intenter actualizar la Facultad.",
    });
  }
};

// Controlador encargado de eliminar una facultad
export const deleteFaculty = async (req, res) => {
  try {
    const { facultyId } = req.params;

    const faculty = await Faculty.findByPk(facultyId);
    if (!faculty)
      return res.status(404).json({ error: "Facultad no encontrada." });

    await faculty.destroy();

    return res.status(200).json({ message: "Facultad eliminada con exito." });
  } catch (error) {
    console.log(
      "Se ha presentado un error al intenter eliminar la Facultad:",
      error
    );

    return res.status(500).json({
      error: "Se ha presentado un error al intenter eliminar la Facultad.",
    });
  }
};

// Controlador encargado de obtener una facultad por ID
export const getInstitutionById = async (req, res) => {
  try {
    const { facultyId } = req.params;

    const faculty = await Institution.findByPk(facultyId, {
      include: {
        model: Faculty,
        include: [Program],
      },
    });
    if (!faculty)
      return res.status(404).json({ error: "Facultad no encontrada." });

    return res.status(200).json(faculty);
  } catch (error) {
    console.log(
      "Se ha presentado un error al intenter eliminar la Facultad:",
      error
    );

    return res.status(500).json({
      error: "Se ha presentado un error al intenter eliminar la Facultdad.",
    });
  }
};
