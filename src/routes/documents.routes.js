import { Router } from "express";
import multer from "multer";
import {
  deleteDocument,
  documentUpload,
  getDocuments,
  updateDocument,
} from "../controllers/documents/documentController.js";

const router = Router();

// Configurar el almacenamiento para multer
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/");
  },
  filename: (req, file, cb) => {
    // O mantener el nombre original
    cb(null, file.originalname);
  },
  // filename: (req, file, cb) => {
  //   // Puedes añadir un timestamp para evitar sobreescribir archivos con el mismo nombre
  //   const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
  //   const extension = file.originalname.split(".").pop();
  //   cb(null, `${uniqueSuffix}.${extension}`);
  //   // O mantener el nombre original
  //   // cb(null, file.originalname);
  // },
});

// Filtro para tipos de archivo permitidos (opcional)
const fileFilter = (req, file, cb) => {
  // Acepta solo ciertos tipos de archivos
  const allowedTypes = ["image/jpeg", "image/png", "application/pdf"];
  if (allowedTypes.includes(file.mimetype)) {
    cb(null, true);
  } else {
    cb(new Error("Tipo de archivo no permitido"), false);
  }
};

// Crear instancia de multer
const upload = multer({
  storage,
  fileFilter, // Opcional: elimina esta línea si quieres permitir todos los tipos de archivo
  limits: { fileSize: 5 * 1024 * 1024 }, // Limitar a 5MB (opcional)
});

// Rutas
router.get("/", getDocuments);
router.post("/:userId", upload.single("document"), documentUpload);
router.post("/multi/:userId", upload.array("documents", 7), documentUpload);
router.put("/:documentId", upload.single("document"), updateDocument);
router.delete("/:documentId", deleteDocument);

export default router;
