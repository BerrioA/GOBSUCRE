import { body } from "express-validator";
import { validationResultExpress } from "../express-validator.js";

const firstLetter = (str) => {
  return str.charAt(0).toUpperCase() + str.slice(1);
};

export const validationRegisterProgram = [
  body("program_name")
    .trim()
    .notEmpty()
    .withMessage("El nombre de la institucion es obligatorio.")
    .isString()
    .matches(/^[A-Za-zÁÉÍÓÚáéíóúÑñ\s]+$/)
    .withMessage(
      "El nombre de la institucion contiene caracteres no válidos,ingrese solo letras y espacios."
    )
    .isLength({ min: 3 })
    .withMessage(
      "El nombre de la institucion debe tener al menos 3 caracteres."
    )
    .toLowerCase()
    .customSanitizer(firstLetter)
    .escape(),

  body("code")
    .trim()
    .notEmpty()
    .withMessage("El código es obligatorio.")
    .matches(/^\d{2,10}$/)
    .withMessage("El código debe tener entre 1 y 10 dígitos numéricos.")
    .escape(),

  body("facultyId")
    .trim()
    .notEmpty()
    .withMessage("El ID de la facultad es obligatorio.")
    .isUUID()
    .withMessage("El ID de la facultad debe ser un UUID válido.")
    .escape(),

  validationResultExpress,
];

export const validationUpdateProgram = [
  body("program_name")
    .trim()
    .optional({ checkFalsy: true })
    .isString()
    .matches(/^[A-Za-zÁÉÍÓÚáéíóúÑñ\s]+$/)
    .withMessage(
      "El nombre del programa contiene caracteres no válidos,ingrese solo letras y espacios."
    )
    .isLength({ min: 3 })
    .withMessage("El  nombre del programa debe tener al menos 3 caracteres.")
    .toLowerCase()
    .customSanitizer(firstLetter)
    .escape(),

  body("code")
    .trim()
    .optional({ checkFalsy: true })
    .matches(/^\d{2,10}$/)
    .withMessage("El código debe tener entre 1 y 10 dígitos numéricos.")
    .escape(),

  body("facultyId")
    .trim()
    .optional({ checkFalsy: true })
    .isUUID()
    .withMessage("El ID de la facultad debe ser un UUID válido.")
    .escape(),

  validationResultExpress,
];
