import { Router } from "express";
import { privateRegisterAdmin } from "../controllers/private-routes/privateRoutesController.js";
import { validateExistingUser } from "../middlewares/users/validateExistingUser.js";
import { validationRegisterUsers } from "../middlewares/users/validateRegisterUser.js";

const router = Router();

router.post(
  "/",
  validateExistingUser,
  validationRegisterUsers,
  privateRegisterAdmin
);

export default router;
