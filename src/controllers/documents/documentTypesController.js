import { DocumentType } from "../../models/documentTypes.js";

// Controlador encargado de optener todos los tipos de documentos de la base de datos
export const getDocumentTypes = async (req, res) => {
  try {
    const typeDocuments = await DocumentType.findAll({
      attributes: ["id", "document_name"],
    });

    return res.status(200).json(typeDocuments);
  } catch (error) {
    console.error(
      "Se ha presentado un error al intentar optener los tipos de documentos:",
      error
    );

    return res.status(500).json({
      error:
        "Se ha presentado un error al intentar optener los tipos de documentos",
    });
  }
};
