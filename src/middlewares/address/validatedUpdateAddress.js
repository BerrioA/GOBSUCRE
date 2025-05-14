import { body } from "express-validator";
import { validationResultExpress } from "../express-validator.js";

const firstLetter = (str) => {
  return str.charAt(0).toUpperCase() + str.slice(1);
};

export const validationUpdateAddress = [
  body("neighborhood")
    .trim()
    .optional({ checkFalsy: true })
    .isString()
    .matches(/^[A-Za-zÁÉÍÓÚáéíóúÑñ\s]+$/)
    .withMessage("El barrio contiene caracteres no válidos.")
    .isLength({ min: 3 })
    .withMessage("El barrio debe tener al menos 3 caracteres.")
    .toLowerCase()
    .customSanitizer(firstLetter)
    .escape(),

  body("address")
    .trim()
    .optional({ checkFalsy: true })
    .isLength({ min: 5 })
    .withMessage("La dirección debe tener al menos 5 caracteres.")
    .matches(/^[\w\s\#\-\.,°\/]+$/i)
    .withMessage("La dirección contiene caracteres no válidos.")
    .customSanitizer(firstLetter)
    .escape(),

  body("city")
    .trim()
    .optional({ checkFalsy: true })
    .isString()
    .matches(/^[A-Za-zÁÉÍÓÚáéíóúÑñ\s]+$/)
    .withMessage("La ciudad contiene caracteres no válidos.")
    .isLength({ min: 3 })
    .withMessage("La ciudad debe tener al menos 3 caracteres.")
    .customSanitizer(firstLetter)
    .escape(),

  body("department")
    .trim()
    .optional({ checkFalsy: true })
    .isString()
    .matches(/^[A-Za-zÁÉÍÓÚáéíóúÑñ\s]+$/)
    .withMessage("El departamento contiene caracteres no válidos.")
    .isLength({ min: 3 })
    .withMessage("El departamento debe tener al menos 3 caracteres.")
    .escape(),

  validationResultExpress,
];
