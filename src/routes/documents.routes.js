import { Router } from "express";
import multer from "multer";
import {
  deleteDocument,
  documentUpload,
  getDocuments,
  updateDocument,
} from "../controllers/documents/documentController.js";
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
/**
 * @swagger
 * /documents:
 *   get:
 *     summary: Obtener todos los documentos (Solo administrador)
 *     description: Recupera la lista de todos los documentos almacenados en el sistema. Solo accesible por administradores.
 *     tags: [Documents]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Lista de documentos obtenida exitosamente
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   id:
 *                     type: integer
 *                     description: ID del documento
 *                   userId:
 *                     type: integer
 *                     description: ID del usuario al que pertenece el documento
 *                   documentTypesId:
 *                     type: integer
 *                     description: ID del tipo de documento
 *                   originalName:
 *                     type: string
 *                     description: Nombre original del archivo
 *                   fileUrl:
 *                     type: string
 *                     description: URL del archivo almacenado
 *                   fileSize:
 *                     type: number
 *                     format: float
 *                     description: Tamaño del archivo en bytes
 *                   mimeType:
 *                     type: string
 *                     description: Tipo MIME del archivo
 *       401:
 *         description: No autorizado
 *       500:
 *         description: Error del servidor al obtener documentos
 */

router.get("/", requireToken, verifyAdmin, getDocuments);
/**
 * @swagger
 * /documents/{userId}:
 *   post:
 *     summary: Subir un documento
 *     description: Sube un documento para un usuario específico. Solo usuarios autenticados pueden subir documentos.
 *     tags: [Documents]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: userId
 *         required: true
 *         schema:
 *           type: string
 *         description: ID del usuario al que se le asignará el documento
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             required:
 *               - document
 *               - documentTypesId
 *             properties:
 *               document:
 *                 type: string
 *                 format: binary
 *                 description: Archivo del documento a subir
 *               documentTypesId:
 *                 type: integer
 *                 description: ID del tipo de documento
 *     responses:
 *       201:
 *         description: Documento subido exitosamente
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Documento subido correctamente
 *                 data:
 *                   type: object
 *                   properties:
 *                     id:
 *                       type: integer
 *                     userId:
 *                       type: integer
 *                     documentTypesId:
 *                       type: integer
 *                     originalName:
 *                       type: string
 *                     fileUrl:
 *                       type: string
 *                     mimeType:
 *                       type: string
 *                     fileSize:
 *                       type: number
 *       400:
 *         description: Datos inválidos o documento ya existe
 *       401:
 *         description: No autorizado
 *       500:
 *         description: Error del servidor al subir el documento
 */

router.post(
  "/",
  upload.single("document"),
  requireToken,
  verifyAllUsers,
  checkDocumentAlreadyExists,
  documentUpload
);
/**
 * @swagger
 * /documents/{documentId}:
 *   put:
 *     summary: Actualizar un documento existente
 *     description: Permite a un usuario autenticado actualizar un documento específico mediante la subida de un nuevo archivo.
 *     tags: [Documents]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: documentId
 *         required: true
 *         schema:
 *           type: string
 *         description: ID del documento a actualizar
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             required:
 *               - document
 *             properties:
 *               document:
 *                 type: string
 *                 format: binary
 *                 description: Archivo del documento actualizado
 *     responses:
 *       200:
 *         description: Documento actualizado correctamente
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Documento actualizado exitosamente
 *                 data:
 *                   type: object
 *                   properties:
 *                     id:
 *                       type: integer
 *                     originalName:
 *                       type: string
 *                     fileUrl:
 *                       type: string
 *                     mimeType:
 *                       type: string
 *                     fileSize:
 *                       type: number
 *       400:
 *         description: Datos inválidos para la actualización
 *       401:
 *         description: No autorizado
 *       404:
 *         description: Documento no encontrado
 *       500:
 *         description: Error del servidor al actualizar el documento
 */

router.put(
  "/:documentId",
  upload.single("document"),
  requireToken,
  verifyAllUsers,
  updateDocument
);
/**
 * @swagger
 * /documents/{documentId}:
 *   delete:
 *     summary: Eliminar un documento por ID (Solo administrador)
 *     description: Permite a un administrador eliminar un documento específico mediante su ID.
 *     tags: [Documents]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: documentId
 *         required: true
 *         schema:
 *           type: string
 *         description: ID del documento a eliminar
 *     responses:
 *       200:
 *         description: Documento eliminado correctamente
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Documento eliminado exitosamente
 *       401:
 *         description: No autorizado
 *       404:
 *         description: Documento no encontrado
 *       500:
 *         description: Error del servidor al eliminar el documento
 */

router.delete("/:documentId", requireToken, verifyAdmin, deleteDocument);

export default router;
