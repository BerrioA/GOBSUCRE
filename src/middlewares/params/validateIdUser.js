import { param } from "express-validator";
import { validationResultExpress } from "../express-validator.js";

export const validateIdUser = [
  param("userId")
    .trim()
    .notEmpty()
    .withMessage("El ID del usuario es obligatorio.")
    .isUUID()
    .withMessage("El ID del usuario debe ser un UUID válido.")
    .escape(),

  validationResultExpress,
];
