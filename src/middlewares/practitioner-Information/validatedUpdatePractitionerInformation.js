import { body } from "express-validator";
import { validationResultExpress } from "../express-validator.js";

export const validationUpdatePractitionerInformation = [
  body("institutionId")
    .trim()
    .optional({ checkFalsy: true })
    .isUUID()
    .withMessage("El ID de la institución debe ser un UUID válido.")
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
    .matches(/^\d{4}-(0[1-9]|1[0-2])-(0[1-9]|[12]\d|3[01])$/)
    .withMessage("La fecha debe tener el formato YYYY-MM-DD.")
    .custom((value) => {
      const date = new Date(value);
      const isValid = !isNaN(date.getTime());
      if (!isValid) {
        throw new Error("La fecha no es válida.");
      }
      return true;
    })
    .escape(),

  validationResultExpress,
];
