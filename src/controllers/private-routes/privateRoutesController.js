import { sequelize } from "../../database/db.js";
import { Address } from "../../models/address.js";
import { Rol } from "../../models/roles.js";
import { User } from "../../models/users.js";
import bcrypt from "bcryptjs";

// Controlador encargado de registrar el primer usuario en la base de datos como Admin
export const privateRegisterAdmin = async (req, res) => {
  const t = await sequelize.transaction();
  try {
    const { user, address } = req.body;

    const existingAdmin = await User.findOne({
      include: {
        model: Rol,
        where: { role_name: "Admin" },
      },
    });

    if (existingAdmin) {
      return res.status(403).json({
        message: "Esta ruta ya no está disponible.",
      });
    }

    const adminRole = await Rol.findOne({ where: { role_name: "Admin" } });

    if (!adminRole) {
      return res.status(500).json({
        error:
          "No se ha encontrado el rol de administrador en la base de datos.",
      });
    }

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
        rolId: adminRole.id,
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
      message: "Administrador registrado correctamente.",
    });
  } catch (error) {
    await t.rollback();
    console.log(
      "Se ha presentado un error al intentar hacer el registro del administrador:",
      error
    );

    return res.status(500).json({
      error:
        "Se ha presentado un error al intentar hacer el registro del administrador.",
    });
  }
};

// Controlador encargado de actualizar el rol a usuario en la base de datos
export const updateUserRoleAdmin = async (req, res) => {
  try {
    const { userId } = req.params;
    const { rolId } = req.body;

    const existingUser = await User.findByPk(userId);
    if (!existingUser) {
      return res.status(404).json({ error: "Usuario no encontrado." });
    }
    const existsRole = await Rol.findByPk(rolId);
    if (!existsRole) {
      return res.status(404).json({ error: "Rol no encontrado." });
    }

    await existingUser.update({
      rolId: existsRole.id,
    });

    res.status(200).json({
      message: "Rol de usuario actualizado correctamente.",
    });
  } catch (error) {
    console.error("Error al actualizar el rol del usuario:", error);
    res.status(500).json({ error: "Error al actualizar el rol del usuario." });
  }
};

// Controlador encargado de obtener los roles de la base de datos
export const getRoles = async (req, res) => {
  try {
    const roles = await Rol.findAll({ attributes: ["id", "role_name"] });

    return res.status(200).json(roles);
  } catch (error) {
    console.log(
      "Se ha presentado un error al intentar obtener los roles:",
      error
    );

    return res.status(500).json({
      error: "Se ha presentado un error al intentar obtener los roles.",
    });
  }
};
