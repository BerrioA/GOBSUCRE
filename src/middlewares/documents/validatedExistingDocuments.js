import { Document } from "../../models/documents.js";

export const checkDocumentAlreadyExists = async (req, res, next) => {
  try {
    const { documentTypesId } = req.body;
    const userId = req.uid;
    const fileName = req.file?.originalname;

    if (!fileName) {
      return res.status(400).json({ error: "No se envió ningún archivo" });
    }

    // Buscar si ya existe un documento con ese nombre para ese usuario
    const existingDoc = await Document.findOne({
      where: {
        userId,
        originalName: fileName,
        documentTypesId,
      },
    });

    if (existingDoc) {
      return res.status(400).json({
        error: `Ya existe un documento llamado "${fileName}" para este usuario.`,
      });
    }

    next();
  } catch (error) {
    console.error("Error validando documento existente:", error);
    return res.status(500).json({
      error: "Error al validar si el documento ya existe.",
    });
  }
};