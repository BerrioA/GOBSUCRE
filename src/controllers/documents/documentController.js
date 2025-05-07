import { Document } from "../../models/documents.js";

// Controlador encargado de obtener todos los documentos de la base de datos
export const getDocuments = async (req, res) => {
  try {
    const documents = await Document.findAll({
      attributes: ["id", "documentTypesId", "document"],
    });

    return res.status(200).json(documents);
  } catch (error) {
    console.error(
      "Se ha presentado un error al intentar optener todos los documentos",
      error
    );

    return res.status(500).json({
      error: "Se ha presentado un error al intentar optener los documentos",
    });
  }
};

// Controlador encargado de la cargar los documentos
export const documentUpload = async (req, res) => {
  try {
    const { userId } = req.params;
    // Obtener el tipo de documento
    const { documentTypesId } = req.body;

    // Verificar si es un solo archivo o múltiples
    if (req.file) {
      // Un solo archivo
      await Document.create({
        documentTypesId,
        userId,
        document: req.file.filename,
        fileUrl: `/uploads/${req.file.filename}`,
        originalName: req.file.originalname,
        fileSize: req.file.size,
        mimeType: req.file.mimetype,
      });

      return res.status(201).json({
        message: "Documento cargado con éxito.",
        file: req.file.filename,
      });
    } else if (req.files && req.files.length > 0) {
      // Múltiples archivos
      const savedDocuments = [];

      // URL relativa para permitir el acceso acceso web

      // Crear registros para cada archivo
      for (const file of req.files) {
        const newDoc = await Document.create({
          documentTypesId,
          userId,
          document: req.file.filename,
          fileUrl: `/uploads/${req.file.filename}`,
          originalName: file.originalname,
          fileSize: file.size,
          mimeType: file.mimetype,
        });

        savedDocuments.push({
          id: newDoc.id,
          filename: file.filename,
        });
      }

      return res.status(201).json({
        message: "Documentos múltiples cargados con éxito.",
      });
    } else {
      return res.status(400).json({ error: "No se recibieron archivos" });
    }
  } catch (error) {
    console.error(
      "Se ha presentado un error al intentar cargar los documentos.",
      error
    );

    return res.status(500).json({
      error: "Se ha presentado un error al intentar cargar los documentos.",
    });
  }
};

// Controlador encargado de actualizar un documento
export const updateDocument = async (req, res) => {
  try {
    const { documentId } = req.params;
    const document = await Document.findByPk(documentId);
    const { filename, originalname, size, mimetype } = req.file;

    if (!document)
      return res.status(404).json({
        error: "No se ha encontrado el documento que intenta actualizar.",
      });

    // CORRECCIÓN: Primero actualiza las propiedades del objeto
    document.document = filename;
    document.fileUrl = `/uploads/${filename}`;
    document.originalName = originalname;
    document.fileSize = size;
    document.mimeType = mimetype;

    await document.save();

    return res.status(200).json({
      message: "Documento actualizado con éxito.",
      file: req.file.filename,
    });
  } catch (error) {
    console.error(
      "Se ha apresentado un error al intentar actualizar el documento:",
      error
    );

    return res.status(500).json({
      error: "Se ha apresentado un error al intentar actualizar el documento",
    });
  }
};

// Controlador encargado de eliminar un documento
export const deleteDocument = async (req, res) => {
  try {
    const { documentId } = req.params;
    const document = await Document.findByPk(documentId);

    if (!document)
      return res.status(404).json({
        error: "No se ha encontrado el documento que intenta actualizar.",
      });

    await document.destroy();

    return res.status(200).json({
      message: "Documento eliminado con éxito.",
      file: req.file.filename,
    });
  } catch (error) {
    console.error(
      "Se ha apresentado un error al intentar eliminar el documento:",
      error
    );

    return res.status(500).json({
      error: "Se ha apresentado un error al intentar eliminar el documento.",
    });
  }
};
