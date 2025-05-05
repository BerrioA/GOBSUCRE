//Middleware encargado de validar el rol Super Administrador
export const verifyAdmin = (req, res, next) => {
  try {
    const roleAdmin = req.rol;

    if (roleAdmin === "Admin") {
      next();
    } else {
      return res
        .status(400)
        .json({ message: "Acceso denegado, solo administrador." });
    }
  } catch (error) {
    console.log(
      "Se ha presentado un error al intentar acceder como administrador.",
      error
    );

    return res.status(500).json({
      message:
        "Se ha presentado un error al intentar acceder como administrador.",
    });
  }
};

//Middleware encargado de validar el rol estudiante
export const verifyStudent = (req, res, next) => {
  try {
    const roleStudent = req.rol;

    if (roleStudent === "Estudiante") {
      next();
    } else {
      return res
        .status(400)
        .json({ message: "Acceso denegado, solo Estudiante." });
    }
  } catch (error) {
    console.log(
      "Se ha presentado un error al intentar acceder como Estudiante.",
      error
    );

    return res.status(500).json({
      message: "Se ha presentado un error al intentar acceder como Estudiante.",
    });
  }
};

//Middleware encargado de validar todos los roles
export const verifyAllUsers = (req, res, next) => {
  try {
    const roleAdmin = req.rol;
    const roleStudent = req.rol;

    if (roleAdmin === "Admin" || roleStudent === "Estudiante") {
      next();
    } else {
      return res
        .status(400)
        .json({ message: "Acceso denegado, solo administrador o estudiante." });
    }
  } catch (error) {
    console.log(
      "Se ha presentado un error al intentar acceder como administrador o estudiante.",
      error
    );

    return res.status(500).json({
      message:
        "Se ha presentado un error al intentar acceder como administrador o estudiante.",
    });
  }
};
