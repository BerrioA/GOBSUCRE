import { Secretary } from "../../models/secretary.js";
import { Undersecretary } from "../../models/undersecretary.js";

// Controlador encargado de obtener las dependencias con sus subdependencias
export const getDependencies = async (req, res) => {
  try {
    const secretaries = await Secretary.findAll({
      attributes: ["id", "code", "secretary_name"],
      include: [
        {
          model: Undersecretary,
          as: "undersecretaries",
          attributes: ["id", "code", "undersecretary_name"],
        },
      ],
    });

    return res.status(200).json(secretaries);
  } catch (error) {
    console.log(
      "Se ha presentado un error al intentar obtener las dependencias:",
      error
    );

    return res.status(500).json({
      error: "Se ha presentado un error al intentar obtener las dependencias.",
    });
  }
};

// Cotrolador encargado de registrar una dependencia
export const createSecretary = async (req, res) => {
  try {
    const { code, secretary_name } = req.body;

    const existing = await Secretary.findOne({ where: { code } });
    if (existing) {
      return res
        .status(400)
        .json({ error: "Ya existe una secretaría con ese código." });
    }

    const newSecretary = await Secretary.create({ code, secretary_name });
    return res.status(201).json(newSecretary);
  } catch (error) {
    console.error("Error al crear la secretaría:", error);
    return res.status(500).json({ error: "Error al crear la secretaría." });
  }
};

// Cotrolador encargado de eliminar una dependencia
export const deleteSecretary = async (req, res) => {
  try {
    const { dependencyId } = req.params;

    const dependency = await Secretary.findByPk(dependencyId);
    if (!dependency)
      return res.status(404).json({ error: "Dependencia no encontrada." });

    await dependency.destroy();
    return res
      .status(200)
      .json({ message: "Secretaría eliminada correctamente." });
  } catch (error) {
    console.error("Error al eliminar la secretaría:", error);
    return res.status(500).json({ error: "Error al eliminar la secretaría." });
  }
};

// Cotrolador encargado de registrar una Subdependencia
export const createUndersecretary = async (req, res) => {
  try {
    const { code, undersecretary_name, secretaryCode } = req.body;

    const secretary = await Secretary.findOne({
      where: { code: secretaryCode },
    });
    if (!secretary) {
      return res
        .status(400)
        .json({ error: "La secretaría asociada no existe." });
    }

    const existing = await Undersecretary.findOne({ where: { code } });
    if (existing) {
      return res
        .status(400)
        .json({ error: "Ya existe una subsecretaría con ese código." });
    }

    const newUndersecretary = await Undersecretary.create({
      code,
      undersecretary_name,
      secretaryCode,
    });

    return res.status(201).json(newUndersecretary);
  } catch (error) {
    console.error("Error al crear la subsecretaría:", error);
    return res.status(500).json({ error: "Error al crear la subsecretaría." });
  }
};

// Cotrolador encargado de eliminar una dependencia
export const deleteUndersecretary = async (req, res) => {
  try {
    const { subdependencyId } = req.params;

    const subdependency = await Undersecretary.findByPk(subdependencyId);
    if (!subdependency)
      return res.status(404).json({ error: "Subsecretaría no encontrada." });

    await subdependency.destroy();
    return res
      .status(200)
      .json({ message: "Subsecretaría eliminada correctamente." });
  } catch (error) {
    console.error("Error al eliminar la subsecretaría:", error);
    return res
      .status(500)
      .json({ error: "Error al eliminar la subsecretaría." });
  }
};
