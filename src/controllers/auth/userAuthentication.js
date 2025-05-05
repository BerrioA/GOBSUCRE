import bcrypt from "bcryptjs";
import {
  generateRefreshToken,
  generateToken,
} from "../../utils/tokenManager.js";
import { User } from "../../models/users.js";
import {
  ResendValidationCode,
  SendVerificationCode,
  WelcomeEmail,
} from "../../middlewares/email/sendEmail.js";

// Controlador encargado de hacer el loguin del usuario
export const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Buscar usuario y verificar en una sola consulta
    const user = await User.findOne({
      where: { email },
      attributes: ["id", "password", "isVerified", "rolId"], // Traer solo los campos necesarios
    });

    // Si no existe el usuario, devolver error
    if (!user) {
      return res.status(403).json({ message: "Credenciales incorrectas." });
    }

    // Verificar contraseña
    const matchPassword = await bcrypt.compare(password, user.password);
    if (!matchPassword) {
      return res.status(403).json({ message: "Credenciales incorrectas." });
    }

    // Verificar si la cuenta está verificada
    if (!user.isVerified) {
      return res.status(403).json({
        message: "Por favor, verifica tu cuenta para continuar.",
      });
    }

    // Generar tokens
    const { token, expiresIn } = generateToken(user.id);
    generateRefreshToken(user.id, user.rolId, res);

    return res.status(200).json({
      token,
      expiresIn,
    });
  } catch (error) {
    console.error("Error al intentar iniciar sesión:", error);

    return res.status(500).json({
      message: "Error interno del servidor.",
    });
  }
};

// Controlador para cerrar la sesión del usuario
export const logout = async (req, res) => {
  try {
    if (!req.cookies?.refreshToken) {
      return res.status(204).json({ message: "No hay sesión activa." });
    }

    res.clearCookie("refreshToken", {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
    });

    return res.status(200).json({ message: "Sesión cerrada correctamente." });
  } catch (error) {
    console.error("Error al intentar cerrar sesión:", error);
    return res.status(500).json({ message: "Error interno del servidor." });
  }
};

// Controlador encargado de mostraer la información de perfil de usuario
export const profile = async (req, res) => {
  try {
    const user = await User.findByPk(req.uid, {
      attributes: [
        "id",
        "name",
        "middle_name",
        "last_name",
        "second_last_name",
        "rolId",
        "email",
        "isVerified",
      ],
    });

    if (!user) {
      return res.status(404).json({ message: "Usuario no encontrado." });
    }

    return res.status(200).json(user);
  } catch (error) {
    console.error("Error al obtener el perfil del usuario:", error);

    return res.status(500).json({
      message: "Error interno del servidor al obtener el perfil.",
    });
  }
};

// Controlador encargado de generar el refreshToken
export const refreshToken = (req, res) => {
  try {
    const { token, expiresIn } = generateToken(req.uid, req.rolId);

    return res.status(200).json({ token, expiresIn });
  } catch (error) {
    console.error("Error al generar el RefreshToken:", error);

    return res.status(500).json({
      message:
        "Se ha presentado un error en el servidor al intentar generar el RefreshToken.",
    });
  }
};

// Controlador encargado de verificar la dirección de correo
export const verifyEmail = async (req, res) => {
  try {
    const { code } = req.body;
    const user = await User.findOne({ where: { verificationCode: code } });

    await user.update({
      isVerified: true,
      verificationCode: null,
      resendCount: 0,
    });

    await WelcomeEmail(user.email, `${user.name} ${user.last_name}`);

    return res.status(200).json({
      message: "¡Perfecto! tu cuenta ha sido verificada con éxito.",
    });
  } catch (error) {
    console.error(
      `Lo sentimos, no hemos podido verificar la dirección de correo en este momento. Estamos en ello para solucionarlo pronto. ${error}`
    );

    return res.status(500).json({
      error:
        "Lo sentimos, no hemos podido verificar la dirección de correo en este momento. Estamos en ello para solucionarlo pronto.",
    });
  }
};

// Controlador encargado de reenviar el código de verificación del correo electrónico
export const resendEmailCode = async (req, res) => {
  try {
    const { email } = req.body;
    const user = await User.findOne({ where: { email } });
    const now = new Date();

    if (!user) {
      return res.status(404).json({ message: "Usuario no encontrado." });
    }

    const verificationCode = Math.floor(
      100000 + Math.random() * 900000
    ).toString();

    await user.update({
      verificationCode,
      lastResendTime: now,
      resendCount: user.resendCount + 1,
    });

    ResendValidationCode(user.email, user.verificationCode);

    return res.status(200).json({
      message: "Código de verificación reenviado con éxito.",
    });
  } catch (error) {
    console.error("Error al reenviar el código de verificación:", error);

    return res.status(500).json({
      message:
        "Error interno del servidor al intentar reenviar el código de verificación.",
    });
  }
};
