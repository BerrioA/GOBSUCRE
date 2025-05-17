import { body } from "express-validator";
import { validationResultExpress } from "../express-validator.js";

const firstLetter = (str) => {
  return str.charAt(0).toUpperCase() + str.slice(1);
};

export const validationRegisterUsers = [
  body("user.name")
    .trim()
    .notEmpty()
    .withMessage("El nombre es obligatorio.")
    .isString()
    .matches(/^[A-Za-zÁÉÍÓÚáéíóúÑñ]+$/)
    .withMessage("El primer nombre contiene caracteres no válidos.")
    .isLength({ min: 3 })
    .withMessage("El primer nombre debe tener al menos 3 caracteres.")
    .toLowerCase()
    .customSanitizer(firstLetter)
    .escape(),

  body("user.middle_name")
    .optional({ checkFalsy: true })
    .trim()
    .isLength({ min: 3 })
    .withMessage("El segundo nombre debe tener al menos 3 caracteres.")
    .isAlpha("es-ES", { ignore: " " })
    .withMessage("El segundo nombre contiene caracteres no válidos.")
    .customSanitizer(firstLetter)
    .escape(),

  body("user.last_name")
    .trim()
    .notEmpty()
    .withMessage("El primer apellido es obligatorio.")
    .isString()
    .matches(/^[A-Za-zÁÉÍÓÚáéíóúÑñ]+$/)
    .withMessage("El primer apellido contiene caracteres no válidos.")
    .isLength({ min: 3 })
    .withMessage("El primer apellido debe tener al menos 3 caracteres.")
    .customSanitizer(firstLetter)
    .escape(),

  body("user.second_last_name")
    .trim()
    .notEmpty()
    .withMessage("El segundo apellido es obligatorio.")
    .isString()
    .matches(/^[A-Za-zÁÉÍÓÚáéíóúÑñ]+$/)
    .withMessage("El segundo apellido contiene caracteres no válidos.")
    .isLength({ min: 3 })
    .withMessage("El segundo apellido debe tener al menos 3 caracteres.")
    .customSanitizer(firstLetter)
    .escape(),

  body("user.document_type")
    .trim()
    .notEmpty()
    .withMessage("El tipo de documento es obligatorio.")
    .isString()
    .matches(/^[A-Za-z]+$/)
    .withMessage("El tipo de documento debe ser una cadena de texto.")
    .isIn(["CC", "TI"])
    .withMessage("El tipo de documento debe ser 'CC' o 'TI'")
    .escape(),

  body("user.document_number")
    .trim()
    .notEmpty()
    .withMessage("El número de documento es obligatorio.")
    .isNumeric()
    .withMessage("El número de documento debe ser un número.")
    .isLength({ min: 7, max: 10 })
    .withMessage("El número de documento debe tener entre 7 y 10 dígitos.")
    .escape(),

  body("user.cellphone")
    .trim()
    .notEmpty()
    .withMessage("El número de celular es obligatorio.")
    .isNumeric()
    .withMessage("El número de celular debe contener solo números.")
    .isLength({ min: 10, max: 10 })
    .withMessage("El número de celular debe tener 10 dígitos.")
    .escape(),

  body("user.email")
    .trim()
    .notEmpty()
    .withMessage("El correo electrónico es obligatorio.")
    .isEmail()
    .withMessage("El correo electrónico no es válido.")
    .normalizeEmail()
    .escape(),

  body("user.password")
    .trim()
    .notEmpty()
    .withMessage("La contraseña es obligatoria.")
    .isString()
    .withMessage("La contraseña debe ser una cadena de texto.")
    .isStrongPassword({
      minLength: 6,
      minLowercase: 1,
      minUppercase: 1,
      minNumbers: 0,
      minSymbols: 0,
    })
    .withMessage(
      "La contraseña debe tener al menos 6 caracteres, una mayúscula y una minúscula."
    )
    .escape(),

  body("address.neighborhood")
    .trim()
    .notEmpty()
    .withMessage("El barrio es obligatorio.")
    .matches(/^[A-Za-z0-9#\-\sÁÉÍÓÚáéíóúÑñ]+$/)
    .withMessage("El barrio contiene caracteres no válidos.")
    .isLength({ min: 3 })
    .withMessage("El nombre del barrio debe tener al menos 3 caracteres.")
    .customSanitizer(firstLetter)
    .escape(),

  body("address.address")
    .trim()
    .notEmpty()
    .withMessage("La dirección es obligatoria.")
    .isString()
    .matches(/^[A-Za-z0-9\s#-]+$/)
    .withMessage("La dirección contiene caracteres no válidos.")
    .escape(),

  body("address.city")
    .trim()
    .notEmpty()
    .withMessage("La ciudad es obligatoria.")
    .matches(/^[A-Za-z0-9#\-\sÁÉÍÓÚáéíóúÑñ]+$/)
    .withMessage("La ciudad contiene caracteres no válidos.")
    .isLength({ min: 3 })
    .withMessage("La ciudad debe tener al menos 3 caracteres.")
    .customSanitizer(firstLetter)
    .escape(),

  body("address.department")
    .trim()
    .notEmpty()
    .withMessage("El departamento es obligatoria.")
    .matches(/^[A-Za-z0-9#\-\sÁÉÍÓÚáéíóúÑñ]+$/)
    .withMessage("El departamento contiene caracteres no válidos.")
    .isLength({ min: 3 })
    .withMessage("El departamento debe tener al menos 3 caracteres.")
    .customSanitizer(firstLetter)
    .escape(),

  validationResultExpress,
];
