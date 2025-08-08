import express from "express";
import fs from "fs";
import path from "path";
import { Document } from "../models/documents.js";

const router = express.Router();

router.get("/download/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const doc = await Document.findByPk(id);

    if (!doc) {
      return res.status(404).json({ error: "Documento no encontrado" });
    }

    const filePath = path.join(process.cwd(), "uploads", doc.fileUrl);

    if (!fs.existsSync(filePath)) {
      return res
        .status(404)
        .json({ error: "Archivo no encontrado en el servidor" });
    }

    // Descargar con el nombre original
    res.download(filePath, doc.originalName);
  } catch (error) {
    console.error("Error al descargar documento:", error);
    res.status(500).json({ error: "Error al descargar el documento" });
  }
});

export default router;
