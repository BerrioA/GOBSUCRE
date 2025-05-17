import { DocumentType } from "../../models/documentTypes.js";

export const validateExistingDocumentType = async (req, res, next) => {
  try {
    const { document_name } = req.body;

    const documentType = await DocumentType.findOne({
      where: { document_name },
    });

    if (documentType)
      return res.status(403).json({
        error: "Vaya, al parecer este documento ya se encuentra registrado.",
      });

    next();
  } catch (error) {
    console.log(
      "Se ha presentado un error al intentar registrar el tipo de documento:",
      error
    );

    return res.status(500).json({
      error:
        "Se ha presentado un error al intentar registrar el tipo de documento.",
    });
  }
};
