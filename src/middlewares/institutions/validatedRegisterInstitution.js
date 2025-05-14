import { body } from "express-validator";
import { validationResultExpress } from "../express-validator.js";

const firstLetter = (str) => {
  return str.charAt(0).toUpperCase() + str.slice(1);
};

export const validationRegisterInstitution = [
  body("university_name")
    .trim()
    .notEmpty()
    .withMessage("El nombre de la institución es obligatorio.")
    .isString()
    .matches(/^[A-Za-zÁÉÍÓÚáéíóúÑñ\s]+$/)
    .withMessage("El nombre de la institución contiene caracteres no válidos.")
    .isLength({ min: 3 })
    .withMessage(
      "El nombre de la institución debe tener al menos 3 caracteres."
    )
    .toLowerCase()
    .customSanitizer(firstLetter)
    .escape(),

  body("code")
    .trim()
    .notEmpty()
    .withMessage("El codigo es obligatorio.")
    .isString()
    .matches(/^[A-Za-zÁÉÍÓÚáéíóúÑñ0-9]+-[A-Za-zÁÉÍÓÚáéíóúÑñ0-9]+$/)
    .escape(),

  validationResultExpress,
];
