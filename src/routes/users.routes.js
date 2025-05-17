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
} from "../controllers/users/userController.js";
import { validationRegisterUsers } from "../middlewares/users/validateRegisterUser.js";
import { validateExistingUser } from "../middlewares/users/validateExistingUser.js";
import { validationUpdateUsers } from "../middlewares/users/validateUpdateUser.js";
import { validateIdUser } from "../middlewares/params/validateIdUser.js";
import { requireToken } from "../middlewares/auth/requireToken.js";
import { verifyAdmin, verifyAllUsers } from "../middlewares/auth/verifyUser.js";

const router = Router();

// Rutas para la gestión de usuarios
router.get("/", requireToken, verifyAdmin, getAllUsers);
router.post("/", validateExistingUser, validationRegisterUsers, registerUser);
router.patch(
  "/:userId",
  requireToken,
  verifyAllUsers,
  validationUpdateUsers,
  updateUser
);
router.delete(
  "/:userId",
  requireToken,
  verifyAdmin,
  validateIdUser,
  deleteUser
);
router.get("/:userId", requireToken, verifyAdmin, validateIdUser, getUserById);
router.put("/me/password", requireToken, verifyAllUsers, updatePassword);
router.put("/send-password-recovery", sendPasswordRecoveryUrl);
router.put("/reset-password/:verificationCode", resetPassword);

export default router;
