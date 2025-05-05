import jwt from "jsonwebtoken";

// Función encargada de generar el Token
export const generateToken = (uid, rol) => {
  try {
    const expiresIn = 60 * 15;

    const token = jwt.sign({ uid, rol }, process.env.JWT_SECRET, {
      expiresIn,
    });

    return { token, expiresIn };
  } catch (error) {
    console.log(
      "Se ha presentado un error al intentar generar el generar el Token.",
      error
    );

    return res.status(500).json({ message: error.message });
  }
};

// Función encargada de generar el RefreshToken
export const generateRefreshToken = (uid, rol, res) => {
  const expiresIn = 60 * 60 * 15;
  try {
    const refreshToken = jwt.sign({ uid, rol }, process.env.JWT_REFRESH, {
      expiresIn,
    });

    res.cookie("refreshToken", refreshToken, {
      httpOnly: true,
      secure: !(process.env.NODE_ENV === "developer"),
      expires: new Date(Date.now() + expiresIn * 1000),
    });
  } catch (error) {
    console.log(
      "Se ha presentado un error al intentar generar el RefreshToken.",
      error
    );

    return res.status(500).json({ message: error.message });
  }
};

//Función encargada de retornar todo los erroes posibles en al momento de generar el JWT
export const tokenVerificationErrors = {
  "invalid signature":
    "La firma del token es inválida. Asegúrate de utilizar una clave de firma correcta.",
  "jwt expired":
    "El token ha expirado. Solicita una nueva autenticación para continuar.",
  "invalid token":
    "El token proporcionado no es válido. Verifica su estructura y autenticidad.",
  "jwt malformed":
    "El formato del token es incorrecto. Asegúrate de enviar un JWT bien formado.",
};
