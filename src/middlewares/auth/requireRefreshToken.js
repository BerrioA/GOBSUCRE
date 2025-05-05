import jwt from "jsonwebtoken";
import { tokenVerificationErrors } from "../../utils/tokenManager.js";

// Función encargada de generar y validar el refreshtoken
export const requireRefreshToken = (req, res, next) => {
  try {
    const refreshTokenCookie = req.cookies.refreshToken;
    if (!refreshTokenCookie) {
      return res.status(403).json({
        message:
          "El token debe enviarse en el encabezado de autorización con el formato Bearer.",
      });
    }
    const { uid, rol } = jwt.verify(
      refreshTokenCookie,
      process.env.JWT_REFRESH
    );

    req.uid = uid;
    req.rol = rol;



    next();
  } catch (error) {
    console.log(
      "Se he presentado un error en el Refreshtoken requerido:",
      error.message
    );

    return res
      .status(401)
      .send({ message: tokenVerificationErrors[error.message] });
  }
};
