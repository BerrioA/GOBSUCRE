import { Router } from "express";
import {
  getRoles,
  privateRegisterAdmin,
  updateUserRoleAdmin,
} from "../controllers/private-routes/privateRoutesController.js";
import { validateExistingUser } from "../middlewares/users/validateExistingUser.js";
import { validationRegisterUsers } from "../middlewares/users/validateRegisterUser.js";
import { requireToken } from "../middlewares/auth/requireToken.js";
import { verifyAdmin } from "../middlewares/auth/verifyUser.js";
import { validateIdUser } from "../middlewares/params/validateIdUser.js";

const router = Router();

// Todos los roles
router.get("/roles", requireToken, verifyAdmin, getRoles);

// Registro de primer administrador con rol Administrador
router.post(
  "/",
  validateExistingUser,
  validationRegisterUsers,
  privateRegisterAdmin
);

// Actualizar rol de usuario
router.patch(
  "/update-role/:userId",
  requireToken,
  verifyAdmin,
  validateIdUser,
  updateUserRoleAdmin
);

export default router;
