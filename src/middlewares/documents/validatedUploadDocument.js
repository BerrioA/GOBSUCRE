import { body } from "express-validator";
import { validationResultExpress } from "../express-validator.js";

// Middleware para verificar si hay archivos
const checkFileExists = (req, res, next) => {
  if (!req.file && (!req.files || req.files.length === 0)) {
    return res.status(400).json({
      error: "Se requiere al menos un archivo de documento.",
    });
  }
  next();
};

export const validateDocumentUpload = [
  body("documentTypesId")
    .trim()
    .notEmpty()
    .withMessage("El ID del tipo de documento es obligatorio.")
    .isUUID()
    .withMessage("El ID del tipo de documento debe ser un UUID válido.")
    .escape(),

  validationResultExpress,

  checkFileExists,
];
