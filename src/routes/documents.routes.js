import { Router } from "express";
import multer from "multer";
import {
  deleteDocument,
  documentUpload,
  getDocuments,
  updateDocument,
} from "../controllers/documents/documentController.js";
import { validateDocumentUpload } from "../middlewares/documents/validatedUploadDocument.js";
import { validateDocumentUpdate } from "../middlewares/documents/validatedUpdateDocument.js";

const router = Router();

// Configurar el almacenamiento para multer
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/");
  },
  // filename: (req, file, cb) => {
  //   // O mantener el nombre original
  //   cb(null, file.originalname);
  // },
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    const extension = file.originalname.split(".").pop();
    cb(null, `${uniqueSuffix}.${extension}`);
    // O mantener el nombre original
    // cb(null, file.originalname);
  },
});

// Filtro para tipos de archivo permitidos (opcional)
const fileFilter = (req, file, cb) => {
  const allowedTypes = [
    "application/pdf",
    "application/msword",
    "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
  ];

  if (allowedTypes.includes(file.mimetype)) {
    cb(null, true);
  } else {
    cb(new Error("Solo se permiten archivos PDF o Word."), false);
  }
};

// Crear instancia de multer
const upload = multer({
  storage,
  // Opcional: elimina esta línea si quieres permitir todos los tipos de archivo
  fileFilter,
  // Limitar a 5MB
  limits: { fileSize: 5 * 1024 * 1024 },
});

// Rutas
router.get("/", getDocuments);
router.post(
  "/:userId",
  upload.single("document"),
  validateDocumentUpload,
  documentUpload
);
router.put(
  "/:documentId",
  upload.single("document"),
  validateDocumentUpdate,
  updateDocument
);
router.delete("/:documentId", deleteDocument);

export default router;
