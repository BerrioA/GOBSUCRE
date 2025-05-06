import { Rol } from "../../models/roles.js";

const validatedRole = async (rolId) => {
  try {
    const role = await Rol.findByPk(rolId, { attributes: ["role_name"] });

    if (!role) {
      return "Rol no encontrado";
    }

    switch (role.role_name) {
      case "Admin":
        return "Admin";

      case "Estudiante":
        return "Estudiante";

      default:
        return "Rol no existente";
    }
  } catch (error) {
    console.error(
      "Se ha presentado un error al intentar validar el rol del usuario.",
      error
    );

    return res.status(500).json({
      error:
        "Se ha presentado un error al intentar validar el rol del usuario.",
    });
  }
};

//Middleware encargado de validar el rol administrador
export const verifyAdmin = async (req, res, next) => {
  try {
    const roleAdmin = await validatedRole(req.rolId);

    if (roleAdmin === "Admin") {
      return next();
    }

    return res.status(400).json({
      message: "Acceso denegado, solo Administrador.",
    });
  } catch (error) {
    console.error("Error al validar el rol:", error);
    return res.status(500).json({
      error: "Error al validar el rol Administrador.",
    });
  }
};

// Middleware encargado de validar el rol estudiante
export const verifyStudent = async (req, res, next) => {
  try {
    const roleStudent = await validatedRole(req.rolId);

    if (roleStudent === "Estudiante") {
      return next();
    }

    return res.status(400).json({
      message: "Acceso denegado, solo Estudiante.",
    });
  } catch (error) {
    console.error("Error al validar el rol:", error);
    return res.status(500).json({
      error: "Error al validar el rol estudiante.",
    });
  }
};

// //Middleware encargado de validar el rol de administrador o estudiante
export const verifyAllUsers = async (req, res, next) => {
  try {
    const role = await validatedRole(req.rolId);

    if (role === "Admin" || role === "Estudiante") {
      return next();
    }

    return res.status(400).json({
      message: "Acceso denegado, no tiene permisos para acceder a esta ruta.",
    });
  } catch (error) {
    console.error("Error al validar el rol:", error);
    return res.status(500).json({
      error: "Error al validar el rol del usuario.",
    });
  }
};
