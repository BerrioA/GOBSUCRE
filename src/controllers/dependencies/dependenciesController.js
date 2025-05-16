import { Secretary } from "../../models/secretary.js";
import { Undersecretary } from "../../models/undersecretary.js";

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
