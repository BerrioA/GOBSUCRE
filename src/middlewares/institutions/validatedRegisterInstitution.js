import { body } from "express-validator";
import { validationResultExpress } from "../express-validator.js";

const firstLetter = (str) => {
  return str.charAt(0).toUpperCase() + str.slice(1);
};

export const validationRegisterInstitution = [
  body("university_name")
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
    .withMessage("El código o NIT es obligatorio.")
    .matches(/^(\d{3}\.\d{3}\.\d{3}|\d{9})-\d$/)
    .withMessage(
      "El código o NIT debe tener el formato XXX.XXX.XXX - Y, usando solo números."
    )
    .escape(),

  validationResultExpress,
];

export const validationUpdateInstitution = [
  body("university_name")
    .trim()
    .optional({ checkFalsy: true })
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
    .optional({ checkFalsy: true })
    .matches(/^(\d{3}\.\d{3}\.\d{3}|\d{9})-\d$/)
    .withMessage(
      "El código o NIT debe tener el formato XXX.XXX.XXX - Y, usando solo números."
    )
    .escape(),

  validationResultExpress,
];
