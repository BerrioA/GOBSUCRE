import { Op } from "sequelize";
import { Program } from "../../models/programs.js";

const normalizeName = (str) => {
  return str
    .trim()
    .toLowerCase()
    .split(" ")
    .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
    .join(" ");
};

export const validateExistingProgram = async (req, res, next) => {
  try {
    const { program_name, code, facultyId } = req.body;
    const normalizedName = normalizeName(program_name);

    const existingProgram = await Program.findOne({
      where: {
        [Op.or]: [
          { facultyId, program_name: normalizedName },
          { facultyId, code },
        ],
      },
    });

    if (existingProgram) {
      if (existingProgram.program_name === normalizedName) {
        return res.status(403).json({
          error:
            "Vaya, al parecer esta facultad ya tiene este programa registrado (Nombre duplicado).",
        });
      }

      if (existingProgram.code === code) {
        return res.status(403).json({
          error:
            "Vaya, al parecer esta facultad ya tiene este programa registrado (Código duplicado).",
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
