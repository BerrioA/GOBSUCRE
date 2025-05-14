import { body } from "express-validator";
import { validationResultExpress } from "../express-validator.js";

const firstLetter = (str) => {
  return str.charAt(0).toUpperCase() + str.slice(1);
};

export const validationUpdateProgram = [
  body("program_name")
    .trim()
    .optional({ checkFalsy: true })
    .isString()
    .matches(/^[A-Za-zÁÉÍÓÚáéíóúÑñ\s]+$/)
    .withMessage("El nombre del programa contiene caracteres no válidos.")
    .isLength({ min: 3 })
    .withMessage("El nombre del programa debe tener al menos 3 caracteres.")
    .toLowerCase()
    .customSanitizer(firstLetter)
    .escape(),

  body("code")
    .trim()
    .optional({ checkFalsy: true })
    .isString()
    .matches(/^[A-Za-zÁÉÍÓÚáéíóúÑñ0-9]+$/)
    .escape(),

  body("facultyId")
    .trim()
    .optional({ checkFalsy: true })
    .isUUID()
    .withMessage("El ID de la facultad debe ser un UUID válido.")
    .escape(),

  validationResultExpress,
];
