import { Op } from "sequelize";
import { User } from "../../models/users.js";

export const validateExistingUser = async (req, res, next) => {
  try {
    const { email, document_number } = req.body.user;

    // Validar si el usuario ya existe mediante el correo electrónico o el número de documento
    const existingUser = await User.findOne({
      where: {
        [Op.or]: [{ email }, { document_number }],
      },
    });

    if (existingUser) {
      if (email === existingUser.email) {
        return res.status(400).json({
          error: "Este correo electrónico ya está registrado.",
        });
      }

      if (document_number === existingUser.document_number) {
        return res.status(400).json({
          error: "Este número de documento ya está registrado.",
        });
      }
    }

    next();
  } catch (error) {
    console.error(
      "Error en el middleware validacion de usuario existente:",
      error
    );

    // Manejo de errores
    return res.status(500).json({
      message: "Error interno del servidor",
    });
  }
};
