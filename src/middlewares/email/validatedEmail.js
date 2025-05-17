import { body } from "express-validator";
import { validationResultExpress } from "../express-validator.js";

export const validationEmail = [
  body("email")
    .trim()
    .notEmpty()
    .withMessage("El campo email es obligatorio.")
    .isEmail()
    .withMessage("El correo electrónico no es válido.")
    .normalizeEmail()
    .escape(),

  validationResultExpress,
];
