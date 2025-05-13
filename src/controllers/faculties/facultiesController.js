import { Faculty } from "../../models/faculties.js";

// Controlador encargado de obtener todas las facultades
export const getFaculties = async (req, res) => {
  try {
    const faculties = await Faculty.findAll({
      attributes: ["id", "faculty_name", "institutionId"],
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
    const { faculty_name, code } = req.body;

    const faculty = await Faculty.findByPk(facultyId);
    if (!faculty)
      return res.status(404).json({ error: "Facultad no encontrada." });

    if (faculty_name && faculty_name !== faculty.faculty_name)
      faculty.faculty_name = faculty_name;
    if (code && code !== faculty.code) faculty.code = code;

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
