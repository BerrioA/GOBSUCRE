import { body } from "express-validator";
import { validationResultExpress } from "../express-validator.js";

// Función para transformar la primera letra de una cadena a mayúscula
const firstLetter = (str) => {
  return str.charAt(0).toUpperCase() + str.slice(1);
};

// Middleware para validar los datos de registro de usuarios
export const validationUpdateUsers = [
  body("user.name")
    .trim()
    .optional({ checkFalsy: true })
    .isString()
    .matches(/^[A-Za-zÁÉÍÓÚáéíóúÑñ]+$/)
    .withMessage("El primer nombre contiene caracteres no válidos.")
    .isLength({ min: 3 })
    .withMessage("El primer nombre debe tener al menos 3 caracteres.")
    .toLowerCase()
    .customSanitizer(firstLetter)
    .escape(),

  body("user.middle_name")
    .optional()
    .trim()
    .isLength({ min: 3 })
    .withMessage("El segundo nombre debe tener al menos 3 caracteres.")
    .isAlpha("es-ES", { ignore: " " })
    .withMessage("El segundo nombre contiene caracteres no válidos.")
    .customSanitizer(firstLetter)
    .escape(),

  body("user.last_name")
    .trim()
    .optional({ checkFalsy: true })
    .isString()
    .matches(/^[A-Za-zÁÉÍÓÚáéíóúÑñ]+$/)
    .withMessage("El primer apellido contiene caracteres no válidos.")
    .isLength({ min: 3 })
    .withMessage("El primer apellido debe tener al menos 3 caracteres.")
    .customSanitizer(firstLetter)
    .escape(),

  body("user.second_last_name")
    .trim()
    .optional({ checkFalsy: true })
    .isString()
    .matches(/^[A-Za-zÁÉÍÓÚáéíóúÑñ]+$/)
    .withMessage("El segundo apellido contiene caracteres no válidos.")
    .isLength({ min: 3 })
    .withMessage("El segundo apellido debe tener al menos 3 caracteres.")
    .customSanitizer(firstLetter)
    .escape(),

  body("user.document_type")
    .trim()
    .optional({ checkFalsy: true })
    .isString()
    .matches(/^[A-Za-z]+$/)
    .withMessage("El tipo de documento debe ser una cadena de texto.")
    .isIn(["CC", "TI"])
    .withMessage("El tipo de documento debe ser 'CC' o 'TI'")
    .escape(),

  body("user.document_number")
    .trim()
    .optional({ checkFalsy: true })
    .isNumeric()
    .withMessage("El número de documento debe ser un número.")
    .isLength({ min: 7, max: 10 })
    .withMessage("El número de documento debe tener entre 7 y 10 dígitos.")
    .escape(),

  body("user.cellphone")
    .trim()
    .optional({ checkFalsy: true })
    .isNumeric()
    .withMessage("El número de celular debe contener solo números.")
    .isLength({ min: 10, max: 10 })
    .withMessage("El número de celular debe tener 10 dígitos.")
    .escape(),

  body("user.email")
    .trim()
    .optional({ checkFalsy: true })
    .isEmail()
    .withMessage("El correo electrónico no es válido.")
    .normalizeEmail()
    .escape(),

  body("address.neighborhood")
    .trim()
    .optional({ checkFalsy: true })
    .matches(/^[A-Za-z0-9#\-\sÁÉÍÓÚáéíóúÑñ]+$/)
    .withMessage("El barrio contiene caracteres no válidos.")
    .isLength({ min: 3 })
    .withMessage("El nombre del barrio debe tener al menos 3 caracteres.")
    .customSanitizer(firstLetter)
    .escape(),

  body("address.address")
    .trim()
    .optional({ checkFalsy: true })
    .isString()
    .matches(/^[A-Za-z0-9\s#-]+$/)
    .withMessage("La dirección contiene caracteres no válidos.")
    .escape(),

  body("address.city")
    .trim()
    .optional({ checkFalsy: true })
    .matches(/^[A-Za-z0-9#\-\sÁÉÍÓÚáéíóúÑñ]+$/)
    .withMessage("La ciudad contiene caracteres no válidos.")
    .isLength({ min: 3 })
    .withMessage("La ciudad debe tener al menos 3 caracteres.")
    .customSanitizer(firstLetter)
    .escape(),

  body("address.department")
    .trim()
    .optional({ checkFalsy: true })
    .matches(/^[A-Za-z0-9#\-\sÁÉÍÓÚáéíóúÑñ]+$/)
    .withMessage("El departamento contiene caracteres no válidos.")
    .isLength({ min: 3 })
    .withMessage("El departamento debe tener al menos 3 caracteres.")
    .customSanitizer(firstLetter)
    .escape(),

  validationResultExpress,
];

export const validationUpdatePassword = [
  body("newPassword")
    .trim()
    .notEmpty()
    .withMessage("La nueva contraseña es obligatoria.")
    .isString()
    .withMessage("La nueva contraseña debe ser una cadena de texto.")
    .isStrongPassword({
      minLength: 6,
      minLowercase: 1,
      minUppercase: 1,
      minNumbers: 0,
      minSymbols: 0,
    })
    .withMessage(
      "La nueva contraseña debe tener al menos 6 caracteres, una mayúscula y una minúscula."
    )
    .escape(),
];
