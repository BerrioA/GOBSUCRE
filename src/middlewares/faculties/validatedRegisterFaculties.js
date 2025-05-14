import { body, param } from "express-validator";
import { validationResultExpress } from "../express-validator.js";

const firstLetter = (str) => {
  return str.charAt(0).toUpperCase() + str.slice(1);
};

export const validationRegisterFaculty = [
  body("faculty_name")
    .trim()
    .notEmpty()
    .withMessage("El nombre de la facultad es obligatorio.")
    .isString()
    .matches(/^[A-Za-zÁÉÍÓÚáéíóúÑñ\s]+$/)
    .withMessage("El nombre de la facultad contiene caracteres no válidos.")
    .isLength({ min: 3 })
    .withMessage("El nombre de la facultad debe tener al menos 3 caracteres.")
    .toLowerCase()
    .customSanitizer(firstLetter)
    .escape(),

  param("institutionId")
    .trim()
    .notEmpty()
    .withMessage("El ID de la institución es obligatorio.")
    .isUUID()
    .withMessage("El ID de la institución debe ser un UUID válido.")
    .escape(),

  validationResultExpress,
];
