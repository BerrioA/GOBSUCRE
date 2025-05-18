import { sequelize } from "../../database/db.js";
import { Address } from "../../models/address.js";
import { Rol } from "../../models/roles.js";
import { User } from "../../models/users.js";
import bcrypt from "bcryptjs";

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
