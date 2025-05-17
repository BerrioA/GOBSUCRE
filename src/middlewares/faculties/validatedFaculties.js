import { body } from "express-validator";
import { validationResultExpress } from "../express-validator.js";

const firstLetter = (str) => {
  return str.charAt(0).toUpperCase() + str.slice(1);
};

export const validationRegisterFaculties = [
  body("faculty_name")
    .trim()
    .notEmpty()
    .withMessage("El nombre de la facultad es obligatorio.")
    .isString()
    .matches(/^[A-Za-zÁÉÍÓÚáéíóúÑñ\s]+$/)
    .withMessage(
      "El nombre de la facultad contiene caracteres no válidos,ingrese solo letras y espacios."
    )
    .isLength({ min: 3 })
    .withMessage("El nombre de la facultad debe tener al menos 3 caracteres.")
    .toLowerCase()
    .customSanitizer(firstLetter)
    .escape(),

  body("institutionId")
    .trim()
    .notEmpty()
    .withMessage("El ID de la institucion es obligatorio.")
    .isUUID()
    .withMessage("El ID de la institucion debe ser un UUID válido.")
    .escape(),

  validationResultExpress,
];

export const validationUpdateFaculties = [
  body("faculty_name")
    .trim()
    .optional({ checkFalsy: true })
    .isString()
    .matches(/^[A-Za-zÁÉÍÓÚáéíóúÑñ\s]+$/)
    .withMessage(
      "El nombre de la facultad contiene caracteres no válidos,ingrese solo letras y espacios."
    )
    .isLength({ min: 3 })
    .withMessage("El nombre de la facultad debe tener al menos 3 caracteres.")
    .toLowerCase()
    .customSanitizer(firstLetter)
    .escape(),

  body("institutionId")
    .trim()
    .optional({ checkFalsy: true })
    .isUUID()
    .withMessage("El ID de la institucion debe ser un UUID válido.")
    .escape(),

  validationResultExpress,
];
