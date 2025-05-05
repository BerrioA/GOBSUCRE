import jwt from "jsonwebtoken";
import { tokenVerificationErrors } from "../../utils/tokenManager.js";

//Función encargada de requerir el token para la validación
export const requireToken = (req, res, next) => {
  try {
    let token = req.headers?.authorization;

    if (!token) {
      return res.status(403).json({
        message:
          "El token debe enviarse en el encabezado de autorización con el formato Bearer.",
      });
    }

    token = token.split(" ")[1];

    //Aquí viene la información del payload que deseo mostrar destructurada
    const { uid, rol } = jwt.verify(token, process.env.JWT_SECRET);

    req.uid = uid;
    req.rol = rol;

    next();
  } catch (error) {
    console.log(
      "Se he presentado un error en el token requerido:",
      error.message
    );

    return res
      .status(401)
      .send({ message: tokenVerificationErrors[error.message] });
  }
};
