import { body } from "express-validator";
import { validationResultExpress } from "../express-validator.js";

export const validateRegisterPractitonerInformation = [
  body("institutionId")
    .trim()
    .notEmpty()
    .withMessage("El ID de la institutión es obligatorio.")
    .isUUID()
    .withMessage("El ID de la institutión debe ser un UUID válido.")
    .escape(),

  body("facultyId")
    .trim()
    .notEmpty()
    .withMessage("El ID de la facultad es obligatorio.")
    .isUUID()
    .withMessage("El ID de la facultad debe ser un UUID válido.")
    .escape(),

  body("programId")
    .trim()
    .notEmpty()
    .withMessage("El ID del programa es obligatorio.")
    .isUUID()
    .withMessage("El ID del programa debe ser un UUID válido.")
    .escape(),

  body("start_date")
    .trim()
    .notEmpty()
    .withMessage("La fecha de inicio a practicas es obligatoria.")
    .isISO8601({ strict: true })
    .withMessage(
      "La fecha de inicio debe ser una fecha válida con formato YYYY-MM-DD."
    )
    .escape(),

  body("secretaryId")
    .trim()
    .optional({ checkFalsy: true })
    .isUUID()
    .withMessage(
      "El ID de la secretaria o dependencia debe ser un UUID válido."
    )
    .escape(),

  body("undersecretaryId")
    .trim()
    .optional({ checkFalsy: true })
    .isUUID()
    .withMessage(
      "El ID de la secretaria o dependencia debe ser un UUID válido."
    )
    .escape(),

  validationResultExpress,
];

export const validateUpdatePractitonerInformation = [
  body("institutionId")
    .trim()
    .optional({ checkFalsy: true })
    .isUUID()
    .withMessage("El ID de la institutión debe ser un UUID válido.")
    .escape(),

  body("facultyId")
    .trim()
    .optional({ checkFalsy: true })
    .isUUID()
    .withMessage("El ID de la facultad debe ser un UUID válido.")
    .escape(),

  body("programId")
    .trim()
    .optional({ checkFalsy: true })
    .isUUID()
    .withMessage("El ID del programa debe ser un UUID válido.")
    .escape(),

  body("start_date")
    .trim()
    .optional({ checkFalsy: true })
    .isISO8601({ strict: true })
    .withMessage(
      "La fecha de inicio debe ser una fecha válida con formato YYYY-MM-DD."
    )
    .escape(),

  body("secretaryId")
    .trim()
    .optional({ checkFalsy: true })
    .isUUID()
    .withMessage(
      "El ID de la secretaria o dependencia debe ser un UUID válido."
    )
    .escape(),

  body("undersecretaryId")
    .trim()
    .optional({ checkFalsy: true })
    .isUUID()
    .withMessage(
      "El ID de la secretaria o dependencia debe ser un UUID válido."
    )
    .escape(),

  validationResultExpress,
];
