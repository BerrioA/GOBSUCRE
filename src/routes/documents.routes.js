import { Router } from "express";
import multer from "multer";
import {
  deleteDocument,
  documentUpload,
  getDocuments,
  updateDocument,
} from "../controllers/documents/documentController.js";
import { validateIdUser } from "../middlewares/params/validateIdUser.js";
import { requireToken } from "../middlewares/auth/requireToken.js";
import { verifyAdmin, verifyAllUsers } from "../middlewares/auth/verifyUser.js";
import { checkDocumentAlreadyExists } from "../middlewares/documents/validatedExistingDocuments.js";

const router = Router();

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/");
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    const extension = file.originalname.split(".").pop();
    cb(null, `${uniqueSuffix}.${extension}`);
    // O mantener el nombre original
    // cb(null, file.originalname);
  },
});

const fileFilter = (req, file, cb) => {
  const allowedTypes = [
    "application/pdf",
    "application/msword",
    "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
  ];

  if (allowedTypes.includes(file.mimetype)) {
    cb(null, true);
  } else {
    cb(new Error("Tipo de archivo no permitido"), false);
  }
};
const upload = multer({
  storage,
  fileFilter,
  limits: { fileSize: 5 * 1024 * 1024 },
});

// Rutas
router.get("/", requireToken, verifyAdmin, getDocuments);
router.post(
  "/:userId",
  upload.single("document"),
  requireToken,
  verifyAllUsers,
  validateIdUser,
  checkDocumentAlreadyExists,
  documentUpload
);
router.put(
  "/:documentId",
  upload.single("document"),
  requireToken,
  verifyAllUsers,
  updateDocument
);
router.delete("/:documentId", requireToken, verifyAdmin, deleteDocument);

export default router;
