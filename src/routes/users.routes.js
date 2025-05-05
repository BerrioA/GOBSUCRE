import { Router } from "express";
import {
  deleteUser,
  getAllUsers,
  getUserById,
  registerUser,
  resetPassword,
  sendPasswordRecoveryUrl,
  updatePassword,
  updateUser,
} from "../controllers/users/UserController.js";
import { validationRegisterUsers } from "../middlewares/users/validateRegisterUser.js";
import { validateExistingUser } from "../middlewares/users/validateExistingUser.js";
import { validationUpdateUsers } from "../middlewares/users/validateUpdateUser.js";
import { validateIdUser } from "../middlewares/params/validateIdUser.js";

const router = Router();

// Rutas para la gestión de usuarios
// GET /api/users - Obtener todos los usuarios
// POST /api/users - Registrar un nuevo usuario
// PATCH /api/users/:idUser - Actualizar un usuario existente
// DELETE /api/users/:idUser - Eliminar un usuario existente
// GET /api/users/:idUser - Obtener un usuario por su ID
// PUT /api/users/me/password/:idUser - Actualizar la contraseña de un usuario logueado
router.get("/", getAllUsers);
router.post("/", validateExistingUser, validationRegisterUsers, registerUser);
router.patch("/:idUser", validationUpdateUsers, updateUser);
router.delete("/:idUser", validateIdUser, deleteUser);
router.get("/:idUser", validateIdUser, getUserById);
router.put("/me/password/:idUser", validateIdUser, updatePassword);
router.put("/send-password-recovery", sendPasswordRecoveryUrl);
router.put("/reset-password/:verificationCode", resetPassword);

export default router;
