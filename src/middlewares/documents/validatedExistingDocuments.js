import { Document } from "../../models/documents.js";

export const checkDocumentAlreadyExists = async (req, res, next) => {
  try {
    const { documentTypesId } = req.body;

    if (!documentTypesId) {
      return res.status(400).json({
        error: "Faltan datos necesarios para validar duplicados.",
      });
    }

    const existingDocument = await Document.findOne({
      where: {
        documentTypesId,
        userId: req.uid,
      },
    });

    if (existingDocument) {
      return res.status(409).json({
        error: "Ya existe un documento registrado para este tipo.",
      });
    }

    next(); // No hay conflicto, puede continuar
  } catch (error) {
    console.error("Error al verificar documento duplicado:", error);
    return res.status(500).json({
      error: "Error interno al verificar documento duplicado.",
    });
  }
};
