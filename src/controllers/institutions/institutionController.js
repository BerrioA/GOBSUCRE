import { Faculty } from "../../models/faculties.js";
import { Institution } from "../../models/institutions.js";
import { Program } from "../../models/programs.js";

// Controlador encargado de obtener todas las institutiones
export const getInstitutions = async (req, res) => {
  try {
    const institutions = await Institution.findAll({
      include: ["id", "university_name", "code"],
    });

    return res.status(200).json(institutions);
  } catch (error) {
    console.log(
      "Se ha presentado un error al intenter optener las institutiones:",
      error
    );

    return res.status(500).json({
      error: "Se ha presentado un error al intenter optener las institutiones.",
    });
  }
};

// Controlador encargado de registrar una institution
export const registerInstitution = async (req, res) => {
  try {
    const { university_name, code } = req.body;

    await Institution.create({ university_name, code });

    return res
      .status(200)
      .json({ message: "Institucion registrada con exito." });
  } catch (error) {
    console.log(
      "Se ha presentado un error al intenter registrar la institution:",
      error
    );

    return res.status(500).json({
      error: "Se ha presentado un error al intenter registrar la institution.",
    });
  }
};

// Controlador encargado de actualizar una institution
export const updateInstitution = async (req, res) => {
  try {
    const { institutionId } = req.params;
    const { university_name, code } = req.body;

    const institution = await Institution.findByPk(institutionId);
    if (!institution)
      return res.status(404).json({ error: "Institucion no encontrada." });

    institution.university_name = university_name;
    institution.code = code;

    await institution.save();

    return res
      .status(200)
      .json({ message: "Institucion actualizada con exito." });
  } catch (error) {
    console.log(
      "Se ha presentado un error al intenter actualizar la institution:",
      error
    );

    return res.status(500).json({
      error: "Se ha presentado un error al intenter actualizar la institution.",
    });
  }
};

// Controlador encargado de eliminar una institution
export const deleteInstitution = async (req, res) => {
  try {
    const { institutionId } = req.params;

    const institution = await Institution.findByPk(institutionId);
    if (!institution)
      return res.status(404).json({ error: "Institucion no encontrada." });

    await institution.destroy();

    return res
      .status(200)
      .json({ message: "Institucion eliminada con exito." });
  } catch (error) {
    console.log(
      "Se ha presentado un error al intenter eliminar la institution:",
      error
    );

    return res.status(500).json({
      error: "Se ha presentado un error al intenter eliminar la institution.",
    });
  }
};

// Controlador encargado de obtener una institution por ID
export const getInstitutionById = async (req, res) => {
  try {
    const { institutionId } = req.params;

    const institution = await Institution.findByPk(institutionId, {
      include: {
        model: Faculty,
        include: [Program],
      },
    });
    if (!institution)
      return res.status(404).json({ error: "Institucion no encontrada." });

    return res.status(200).json(institution);
  } catch (error) {
    console.log(
      "Se ha presentado un error al intenter eliminar la institution:",
      error
    );

    return res.status(500).json({
      error: "Se ha presentado un error al intenter eliminar la institution.",
    });
  }
};

// Controlador encargado de obtener todas las institutiones con toda la informacion de la U
export const getInstitutionsAllInformation = async (req, res) => {
  try {
    const institutions = await Institution.findAll({
      attributes: ["id", "university_name", "code"],
      include: [
        {
          model: Faculty,
          attributes: ["id", "faculty_name"],
          include: [
            {
              model: Program,
              attributes: ["id", "program_name", "code"],
            },
          ],
        },
      ],
    });

    return res.status(200).json(institutions);
  } catch (error) {
    console.log(
      "Se ha presentado un error al intenter optener las institutiones:",
      error
    );

    return res.status(500).json({
      error: "Se ha presentado un error al intenter optener las institutiones.",
    });
  }
};
