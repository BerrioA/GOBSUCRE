import {
  Code_Template,
  Url_Template,
  Welcome_Template,
} from "../../libs/verificationCodeTemplate.js";
import { transporter } from "./verificationEmailConfig.js";

// Middleware encargado de enviar el codigo de verificación al correo
export const SendVerificationCode = async (email, verificationCode) => {
  try {
    await transporter.sendMail({
      from: '"GOBSUCRE" <emaildev1214@gmail.com>',
      to: email,
      subject: "Código de verificación. ⚙",
      text: "Gracias por registrarte GOBSUCRE. Por favor, verifica tu dirección de correo para continuar.",
      html: Code_Template.replace(
        "{verificationCode}",
        verificationCode
      ).replace(
        "{cabecera}",
        "Este es tu código de verificación verificación."
      ),
      // html body
    });

    return {
      success: true,
      message:
        "Hemos enviado el código de verificación a tu correo. Por favor, revisa tu bandeja de entrada.",
    };
  } catch (error) {
    console.log(
      `No se ha podido enviar el código de verificación. Estamos trabajando para resolver este problema. ${error}`
    );

    return {
      success: false,
      message:
        "No se ha podido enviar el código de verificación. Estamos trabajando para resolver este problema.",
    };
  }
};

// Middleware encargado de enviar el url para restaurar la contraseña al correo
export const SendUrlResetPassword = async (email, resetPasswordUrl) => {
  try {
    await transporter.sendMail({
      from: '"GOBSUCRE" <emaildev1214@gmail.com>',
      to: email,
      subject: "Restablecer contraseña. ⚙",
      text: "Hemos recibido una solicitud para restablecer tu contraseña en GOBSUCRE.",
      html: Url_Template.replace("{urlCode}", resetPasswordUrl).replace(
        "{cabecera}",
        "Link de reset de password."
      ),
      // html body
    });

    return {
      success: true,
      message:
        "Te hemos enviado un enlace para restablecer tu contraseña. Por favor, revisa tu bandeja de entrada y sigue las instrucciones.",
    };
  } catch (error) {
    console.log(
      `No se ha podido enviar el enlace para restablecer tu contraseña. Estamos trabajando para resolver este problema. ${error}`
    );

    return {
      success: false,
      message:
        "No se ha podido enviar el enlace para restablecer tu contraseña. Estamos trabajando para resolver este problema.",
    };
  }
};

// Middleware encargado de enviar un mensaje de bienvenida y confirmación de registro
export const WelcomeEmail = async (email, name) => {
  try {
    await transporter.sendMail({
      from: '"GOBSUCRE" <emaildev1214@gmail.com>',
      to: email,
      subject: "Cuenta verificada con exito. ✔",
      text: "Bienvenido, tu cuenta ha sido verificada en GOBSUCRE.",
      html: Welcome_Template.replace("{name}", name),
    });

    return {
      success: true,
      message:
        "Hemos enviado el código de verificación a tu correo. Por favor, revisa tu bandeja de entrada.",
    };
  } catch (error) {
    console.log(
      `No se ha podido enviar el código de verificación. Estamos trabajando para resolver este problema. ${error}`
    );

    return {
      success: false,
      message:
        "Hemos enviado el código de verificación a tu correo. Por favor, revisa tu bandeja de entrada.",
    };
  }
};

// Middleware encargado de reenviar el codigo de verificación al correo
export const ResendValidationCode = async (email, verificationCode) => {
  try {
    await transporter.sendMail({
      from: '"GOBSUCRE" <emaildev1214@gmail.com>',
      to: email,
      subject: "Hemos generado tu nuevo código de verificación. 🎯",
      text: "Usa este código de verificación para completar el proceso.",
      html: Code_Template.replace(
        "{verificationCode}",
        verificationCode
      ).replace("{cabecera}", "Hemos generado tu nuevo código de validación."),
    });

    return {
      success: true,
      message:
        "Hemos enviado el código de validación a tu correo. Por favor, revisa tu bandeja de entrada.",
    };
  } catch (error) {
    console.log(
      `No se ha podido enviar el código de validación. Estamos trabajando para resolver este problema. ${error}`
    );

    return {
      success: false,
      message:
        "No se ha podido enviar el código de validación. Estamos trabajando para resolver este problema.",
    };
  }
};
