import { Router } from "express";
import {
  deleteDocumentType,
  getDocumentTypes,
  registerDocumentType,
  updateDocumentType,
} from "../controllers/documents/documentTypesController.js";
import { validateExistingDocumentType } from "../middlewares/Document-types/validatedExistingDocumentType.js";
import {
  validationRegisterDocumentType,
  validationUpdateDocumentType,
} from "../middlewares/Document-types/validatedDocumentType.js";
import { requireToken } from "../middlewares/auth/requireToken.js";
import { verifyAdmin, verifyAllUsers } from "../middlewares/auth/verifyUser.js";

const router = Router();
/**
 * @swagger
 * /documents-types:
 *   get:
 *     summary: Obtener todos los tipos de documentos
 *     description: Retorna una lista con los tipos de documentos disponibles. Accesible para cualquier usuario autenticado.
 *     tags: [DocumentTypes]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Lista de tipos de documentos obtenida correctamente
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   id:
 *                     type: string
 *                     description: ID del tipo de documento
 *                   name:
 *                     type: string
 *                     description: Nombre del tipo de documento
 *               example:
 *                 - id: "docType1"
 *                   name: "Cédula de ciudadanía"
 *                 - id: "docType2"
 *                   name: "Pasaporte"
 *       401:
 *         description: No autorizado, token inválido o no proporcionado
 *       500:
 *         description: Error interno del servidor
 */
router.get("/", requireToken, verifyAllUsers, getDocumentTypes);
/**
 * @swagger
 * /documents-types:
 *   post:
 *     summary: Registrar un nuevo tipo de documento (Solo administrador)
 *     description: Permite a un administrador registrar un nuevo tipo de documento en el sistema.
 *     tags: [DocumentTypes]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - name
 *             properties:
 *               name:
 *                 type: string
 *                 description: Nombre del tipo de documento
 *             example:
 *               name: "Tarjeta de Identidad"
 *     responses:
 *       201:
 *         description: Tipo de documento registrado exitosamente
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: string
 *                   description: ID del nuevo tipo de documento
 *                 name:
 *                   type: string
 *                   description: Nombre del tipo de documento registrado
 *               example:
 *                 id: "docType123"
 *                 name: "Tarjeta de Identidad"
 *       400:
 *         description: Datos inválidos o tipo de documento ya existe
 *       401:
 *         description: No autorizado, token inválido o no proporcionado
 *       403:
 *         description: Acceso denegado, no es administrador
 *       500:
 *         description: Error interno del servidor
 */
router.post(
  "/",
  requireToken,
  verifyAdmin,
  validateExistingDocumentType,
  validationRegisterDocumentType,
  registerDocumentType
);
/**
 * @swagger
 * /documents-types/{documentId}:
 *   put:
 *     summary: Actualizar un tipo de documento existente (Solo administrador)
 *     description: Permite a un administrador actualizar los datos de un tipo de documento por su ID.
 *     tags: [DocumentTypes]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: documentId
 *         required: true
 *         schema:
 *           type: string
 *         description: ID del tipo de documento a actualizar
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 description: Nuevo nombre para el tipo de documento
 *             example:
 *               name: "Cédula de Ciudadanía"
 *     responses:
 *       200:
 *         description: Tipo de documento actualizado correctamente
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: string
 *                 name:
 *                   type: string
 *               example:
 *                 id: "docType123"
 *                 name: "Cédula de Ciudadanía"
 *       400:
 *         description: Datos inválidos para la actualización
 *       401:
 *         description: No autorizado, token inválido o no proporcionado
 *       403:
 *         description: Acceso denegado, solo administradores pueden actualizar tipos de documento
 *       404:
 *         description: Tipo de documento no encontrado
 *       500:
 *         description: Error interno del servidor
 */
router.put(
  "/:documentId",
  requireToken,
  verifyAdmin,
  validationUpdateDocumentType,
  updateDocumentType
);
/**
 * @swagger
 * /documents-types/{documentId}:
 *   delete:
 *     summary: Eliminar un tipo de documento por ID (Solo administrador)
 *     description: Permite a un administrador eliminar un tipo de documento específico usando su ID.
 *     tags: [DocumentTypes]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: documentId
 *         required: true
 *         schema:
 *           type: string
 *         description: ID del tipo de documento a eliminar
 *     responses:
 *       200:
 *         description: Tipo de documento eliminado correctamente
 *       401:
 *         description: No autorizado, token inválido o no proporcionado
 *       403:
 *         description: Acceso denegado, solo administradores pueden eliminar tipos de documento
 *       404:
 *         description: Tipo de documento no encontrado
 *       500:
 *         description: Error interno del servidor
 */
router.delete("/:documentId", requireToken, verifyAdmin, deleteDocumentType);

export default router;
