import { Op } from "sequelize";
import { Institution } from "../../models/institutions.js";

const normalizeName = (str) => {
  return str
    .trim()
    .toLowerCase()
    .split(" ")
    .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
    .join(" ");
};

export const validateExistingInstitution = async (req, res, next) => {
  try {
    const { university_name, code } = req.body;
    const normalizedName = normalizeName(university_name);
    const normalizedCode = code.trim().toLowerCase();

    const existingInstitution = await Institution.findOne({
      where: {
        [Op.or]: [
          { university_name: normalizedName },
          { code: normalizedCode },
        ],
      },
    });

    if (existingInstitution) {
      if (existingInstitution.university_name === normalizedName) {
        return res.status(403).json({
          error:
            "Vaya, al parecer esta institución ya se encuentra registrada (Nombre).",
        });
      }

      if (existingInstitution.code.trim().toLowerCase() === normalizedCode) {
        return res.status(403).json({
          error:
            "Vaya, al parecer esta institución ya se encuentra registrada (código NIT duplicado).",
        });
      }
    }

    next();
  } catch (error) {
    console.log(
      "Se ha presentado un error al intentar validar la información de la institucion:",
      error
    );

    return res.status(500).json({
      error:
        "Se ha presentado un error al intentar validar la información de la institucion.",
    });
  }
};
