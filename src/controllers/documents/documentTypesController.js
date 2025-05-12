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

// Controlador encargado de registrar un nuevo tipo de documento
export const registerDocumentType = async (req, res) => {
  try {
    const { document_name } = req.body;

    await DocumentType.create({ document_name });

    return res
      .status(201)
<<<<<<< HEAD
      .json({ message: `Documento ${document_name} registrado con exito.` });
=======
      .json({ message: "Tipo de documento registrado con exito." });
>>>>>>> Correccion-controladores
  } catch (error) {
    console.error(
      "Se ha presentado un error al intentar registrar el nuevo tipo de documento:",
      error
    );

    return res.status(500).json({
      error:
        "Se ha presentado un error al intentar registrar el nuevo tipo de documento.",
    });
  }
};

// Controlador encargado de actualizar un tipo de documento
export const updateDocumentType = async (req, res) => {
  try {
    const { documentId } = req.params;
    const { document_name } = req.body;

    const document = await DocumentType.findByPk(documentId);
    if (!document)
      return res.status(404).json({
        error:
          "El tipo de documento que intenta actualizar no ha sido encontrado.",
      });

    document.document_name = document_name;

    await document.save();

    return res
      .status(201)
<<<<<<< HEAD
      .json({ message: `Documento ${document_name} actualizado con exito.` });
=======
      .json({ message: `Documento actualizado con exito.` });
>>>>>>> Correccion-controladores
  } catch (error) {
    console.error(
      "Se ha presentado un error al intentar actualizar el tipo de documento:",
      error
    );

    return res.status(500).json({
      error:
        "Se ha presentado un error al intentar actualizar el tipo de documento.",
    });
  }
};

// Controlador encargado de eliminar un tipo de documento
export const deleteDocumentType = async (req, res) => {
  try {
    const { documentId } = req.params;

    const document = await DocumentType.findByPk(documentId);
    if (!document)
      return res.status(404).json({
        error:
          "El tipo de documento que intenta eliminar no ha sido encontrado.",
      });

    await document.destroy();

    return res.status(201).json({ message: `Documento eliminado con exito.` });
  } catch (error) {
    console.error(
      "Se ha presentado un error al intentar eliminar el documento:",
      error
    );

    return res.status(500).json({
      error: "Se ha presentado un error al intentar eliminar el documento.",
    });
  }
};
