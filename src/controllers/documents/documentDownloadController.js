// downloadController.js
import path from "path";
import fs from "fs";

export const downloadDocument = (req, res) => {
  const { filename } = req.params;
  const filePath = path.join(process.cwd(), "uploads", filename);

  if (!fs.existsSync(filePath)) {
    return res.status(404).json({ error: "Archivo no encontrado" });
  }

  res.download(filePath, filename, (err) => {
    if (err) {
      console.error(err);
      res.status(500).json({ error: "Error al descargar el archivo" });
    }
  });
};
