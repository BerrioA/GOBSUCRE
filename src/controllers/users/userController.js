import bcrypt from "bcryptjs";
import CryptoJS from "crypto-js";
import { User } from "../../models/users.js";
import { Address } from "../../models/address.js";
import { sequelize } from "../../database/db.js";
import { SendUrlResetPassword } from "../../middlewares/email/sendEmail.js";
import { Rol } from "../../models/roles.js";

// Controlador encargado de optener todos los usuarios de la base de datos
export const getAllUsers = async (req, res) => {
  try {
    const users = await User.findAll({
      include: [
        {
          model: Rol,
          attributes: ["role_name"],
        },
      ],
    });

    const infoUsers = users.map((user) => {
      return {
        id: user.id,
        name: user.name,
        middle_name: user.middle_name,
        last_name: user.last_name,
        second_last_name: user.second_last_name,
        cellphone: user.cellphone,
        email: user.email,
        status: user.status,
        isVerified: user.isVerified,
        role: user.role?.role_name,
      };
    });

    res.status(200).json(infoUsers);
  } catch (error) {
    console.error("Ha ocurrido un error al optener todos los users:", error);
    res
      .status(500)
      .json({ error: "Ha ocurrido un error al optener todos los usuarios." });
  }
};

// Controlador encargado de registrar un nuevo usuario en la base de datos
export const registerUser = async (req, res) => {
  const t = await sequelize.transaction();
  try {
    const { user, address } = req.body;

    const salt = bcrypt.genSaltSync(10);
    const hashedPassword = await bcrypt.hash(user.password, salt);

    const newUser = await User.create(
      {
        name: user.name,
        middle_name: user.middle_name,
        last_name: user.last_name,
        second_last_name: user.second_last_name,
        document_type: user.document_type,
        document_number: user.document_number,
        cellphone: user.cellphone,
        email: user.email,
        password: hashedPassword,
      },
      { transaction: t }
    );

    await Address.create(
      {
        neighborhood: address.neighborhood,
        address: address.address,
        city: address.city,
        department: address.department,
        userId: newUser.id,
      },
      { transaction: t }
    );

    await t.commit();

    res.status(201).json({
      message: "Usuario registrado correctamente.",
    });
  } catch (error) {
    await t.rollback();
    console.error("Error al registrar usuario:", error);

    res.status(500).json({
      error: "Ha ocurrido un error al registrar el usuario.",
    });
  }
};

// Controlador encargado de actualizar un usuario en la base de datos
export const updateUser = async (req, res) => {
  const t = await sequelize.transaction();

  try {
    const { userId } = req.params;
    const { user, address } = req.body;

    const existingUser = await User.findByPk(userId, { transaction: t });

    if (!existingUser) {
      await t.rollback();
      return res.status(404).json({ error: "Usuario no encontrado." });
    }

    if (user && typeof user === "object") {
      Object.keys(user).forEach((key) => {
        if (user[key] !== undefined) {
          existingUser[key] = user[key];
        }
      });
      await existingUser.save({ transaction: t });
    }

    if (address && typeof address === "object") {
      let userAddress = await Address.findOne({
        where: { userId },
        transaction: t,
      });

      if (userAddress) {
        Object.keys(address).forEach((key) => {
          if (address[key] !== undefined) {
            userAddress[key] = address[key];
          }
        });
        await userAddress.save({ transaction: t });
      } else {
        await Address.create(
          {
            userId,
            ...address,
          },
          { transaction: t }
        );
      }
    }

    await t.commit();
    res.status(200).json({ message: "Usuario actualizado correctamente." });
  } catch (error) {
    await t.rollback();
    console.error("Error al actualizar usuario:", error);
    res.status(500).json({ error: "Error al actualizar el usuario." });
  }
};

// Controlador encargado de eliminar un usuario en la base de datos
export const deleteUser = async (req, res) => {
  try {
    const { userId } = req.params;

    // Buscar el usuario por ID
    const existingUser = await User.findByPk(userId);
    if (!existingUser) {
      return res.status(404).json({ error: "Usuario no encontrado." });
    }

    // Eliminar el usuario
    await existingUser.destroy();

    res.status(200).json({
      message: "Usuario eliminado correctamente.",
    });
  } catch (error) {
    console.error("Error al eliminar usuario:", error);

    res.status(500).json({
      error: "Ha ocurrido un error al eliminar el usuario.",
    });
  }
};

// Controlador encargado de optener un usuario por ID
export const getUserById = async (req, res) => {
  try {
    const { userId } = req.params;

    // Buscar el usuario por ID
    const existingUser = await User.findByPk(userId, {
      attributes: {
        exclude: [
          "document_type",
          "document_number",
          "password",
          "verificationCode",
          "lastResendTime",
          "resendCount",
          "createdAt",
          "updatedAt",
        ],
      },
    });
    if (!existingUser) {
      return res.status(404).json({ error: "Usuario no encontrado." });
    }

    res.status(200).json(existingUser);
  } catch (error) {
    console.error("Error al obtener usuario:", error);

    res.status(500).json({
      error: "Ha ocurrido un error al obtener el usuario.",
    });
  }
};

// Controlador encargado de actualizar la contraseña de un usuario
export const updatePassword = async (req, res) => {
  try {
    // Buscar el usuario por ID
    const existingUser = await User.findByPk(req.uid);

    if (!existingUser) {
      return res.status(404).json({ error: "Usuario no encontrado." });
    }

    const { currentPassword, newPassword } = req.body;

    // Verificar la contraseña actual
    const isPasswordValid = await bcrypt.compare(
      currentPassword,
      existingUser.password
    );
    if (!isPasswordValid) {
      return res.status(401).json({ error: "Contraseña actual incorrecta." });
    }

    // Hash de la nueva contraseña
    const salt = bcrypt.genSaltSync(10);
    const hashedPassword = bcrypt.hashSync(newPassword, salt);

    // Actualizar la contraseña
    await existingUser.update({ password: hashedPassword });

    res.status(200).json({
      message: "Contraseña actualizada correctamente.",
    });
  } catch (error) {
    console.error("Error al actualizar contraseña:", error);

    res.status(500).json({
      error: "Ha ocurrido un error al actualizar la contraseña.",
    });
  }
};

// Controlador encargado de ennviar el link para restablecer la contraseña
export const sendPasswordRecoveryUrl = async (req, res) => {
  try {
    const { email } = req.body;

    // Buscar el usuario por correo electrónico
    const existingUser = await User.findOne({ where: { email } });
    if (!existingUser) {
      return res.status(404).json({ error: "Usuario no encontrado." });
    }

    // Generar un nuevo código de verificación
    const code = Math.floor(100000 + Math.random() * 900000);
    const encryptedCode = CryptoJS.AES.encrypt(
      code.toString(),
      process.env.SECRET_ENCRIPT
    ).toString();

    // Datos a enviar encriptados en el correo electrónico
    const data = {
      email,
      expiresIn: new Date(Date.now() + 15 * 60 * 1000), // 15 minutos
      encryptedCode,
    };

    const verificationCode = JSON.stringify(data);

    const secretCode = CryptoJS.AES.encrypt(
      verificationCode,
      process.env.SECRET_ENCRIPT
    ).toString();

    // Codificar el código para la URL
    const encodedCode = encodeURIComponent(secretCode);

    // Actualizar el usuario con el nuevo código de verificación y la fecha de expiración
    await existingUser.update({
      verificationCode: encryptedCode,
      lastResendTime: new Date(),
      resendCount: existingUser.resendCount + 1,
    });

    // Generando el URL de restauración de contraseña con el código codificado
    const resetPasswordUrl = `${process.env.FRONTEND_URL}/reset-password/${encodedCode}`;

    // Enviar el url de restauración de cotraseña al correo electrónico
    SendUrlResetPassword(existingUser.email, resetPasswordUrl);

    res.status(200).json({
      message:
        "Código de restauración de cotraseña enviado al correo electrónico.",
    });
  } catch (error) {
    console.error("Error al restablecer contraseña:", error);

    res.status(500).json({
      error: "Ha ocurrido un error al restablecer la contraseña.",
    });
  }
};

// Controlador encargado de restablecer la contraseña de un usuario
export const resetPassword = async (req, res) => {
  try {
    const decodedCode = decodeURIComponent(req.params.verificationCode);
    const { newPassword } = req.body;

    // Desencriptar el código de verificación de la URL
    let decryptedCode;
    try {
      const bytes = CryptoJS.AES.decrypt(
        decodedCode,
        process.env.SECRET_ENCRIPT
      );
      decryptedCode = bytes.toString(CryptoJS.enc.Utf8);

      if (!decryptedCode) {
        throw new Error("Código inválido");
      }
    } catch (error) {
      return res.status(400).json({
        error: "Código de verificación inválido o ha expirado.",
      });
    }

    let email, expiresIn, encryptedCode;
    try {
      const parsedData = JSON.parse(decryptedCode);
      email = parsedData.email;
      expiresIn = parsedData.expiresIn;
      encryptedCode = parsedData.encryptedCode;

      if (!email || !expiresIn || !encryptedCode) {
        throw new Error("Datos incompletos");
      }
    } catch (error) {
      return res.status(400).json({
        error: "El formato del código de verificación es inválido.",
      });
    }

    // Validar si el código ya ha expirado
    if (Date.now() > expiresIn) {
      return res.status(400).json({
        error: "El código de verificación ha expirado.",
      });
    }

    // Desencriptar el código de verificación interno
    let decryptedVerificationCode;
    try {
      const decryptionCode = CryptoJS.AES.decrypt(
        encryptedCode,
        process.env.SECRET_ENCRIPT
      );
      decryptedVerificationCode = decryptionCode.toString(CryptoJS.enc.Utf8);

      if (!decryptedVerificationCode) {
        throw new Error("Código interno inválido");
      }
    } catch (error) {
      return res.status(400).json({
        error: "Código de verificación corrupto.",
      });
    }

    const existingUser = await User.findOne({
      where: { email },
    });

    if (!existingUser) {
      return res.status(404).json({
        error: "No se encontró el usuario asociado a este código.",
      });
    }

    // Verificar que el usuario tenga un código de verificación activo
    const userCode = existingUser.verificationCode;
    if (userCode === null) {
      return res.status(400).json({
        error: "Este código ya ha sido utilizado y ha expirado.",
      });
    }

    // Desencriptar el código almacenado en la base de datos
    let decryptedVerificationCodeUser;
    try {
      const decryptionCodeUser = CryptoJS.AES.decrypt(
        userCode,
        process.env.SECRET_ENCRIPT
      );
      decryptedVerificationCodeUser = decryptionCodeUser.toString(
        CryptoJS.enc.Utf8
      );

      if (!decryptedVerificationCodeUser) {
        throw new Error("Código de usuario inválido");
      }
    } catch (error) {
      return res.status(400).json({
        error: "Error al procesar la solicitud de restablecimiento.",
      });
    }

    if (decryptedVerificationCodeUser !== decryptedVerificationCode) {
      return res.status(400).json({
        error: "Código de verificación inválido.",
      });
    }

    const salt = bcrypt.genSaltSync(10);
    const hashedPassword = await bcrypt.hash(newPassword, salt);

    await existingUser.update({
      password: hashedPassword,
      verificationCode: null,
      lastResendTime: null,
      resendCount: 0,
    });

    return res.status(200).json({
      message: "Contraseña restablecida con éxito.",
    });
  } catch (error) {
    console.error("Error al restablecer contraseña:", error);

    return res.status(500).json({
      error: "Ha ocurrido un error al restablecer la contraseña.",
    });
  }
};
