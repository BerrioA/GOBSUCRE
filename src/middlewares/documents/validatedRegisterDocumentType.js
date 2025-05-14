import { body } from "express-validator";
import { validationResultExpress } from "../express-validator.js";

const firstLetter = (str) => {
  return str.charAt(0).toUpperCase() + str.slice(1);
};

export const validateRegisterDocumentType = [
  body("document_name")
    .trim()
    .notEmpty()
    .withMessage("El tipo de documento es obligatorio.")
    .isString()
    .matches(/^[A-Za-zÁÉÍÓÚáéíóúÑñ\s]+$/)
    .withMessage("El tipo de documento contiene caracteres no válidos.")
    .isLength({ min: 3 })
    .withMessage("El tipo de documento debe tener al menos 3 caracteres.")
    .toLowerCase()
    .customSanitizer(firstLetter)
    .escape(),

  validationResultExpress,
];
