// controllers/documents/documentDownloadController.js
import path from "path";
import { fileURLToPath } from "url";
import { Document } from "../../models/documents.js";

// Esto es necesario si usas ES Modules para obtener __dirname
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export const downloadDocument = async (req, res) => {
  try {
    const { documentId } = req.params;

    // Buscar el documento por ID
    const doc = await Document.findByPk(documentId);

    if (!doc) {
      return res.status(404).json({ error: "Documento no encontrado" });
    }

    // Ruta absoluta del archivo
    const filePath = path.join(__dirname, "../../uploads", doc.document);

    // Descargar con nombre original
    res.download(filePath, doc.originalName, (err) => {
      if (err) {
        console.error("Error al descargar el archivo:", err);
        res.status(500).json({ error: "No se pudo descargar el archivo" });
      }
    });
  } catch (error) {
    console.error("Error en descarga:", error);
    res.status(500).json({ error: "Error en el servidor" });
  }
};
