import { Router } from "express";
import {
  deleteInstitution,
  getInstitutionsAllInformation,
  registerInstitution,
  updateInstitution,
} from "../controllers/institutions/institutionController.js";
import {
  validationRegisterInstitution,
  validationUpdateInstitution,
} from "../middlewares/institutions/validatedRegisterInstitution.js";
import { requireToken } from "../middlewares/auth/requireToken.js";
import { verifyAdmin, verifyAllUsers } from "../middlewares/auth/verifyUser.js";
import { validateExistingInstitution } from "../middlewares/institutions/validatedExistingInstitution.js";

const router = Router();

/**
 * @swagger
 * /intitutions:
 *   get:
 *     summary: Obtener toda la información de las instituciones
 *     description: Devuelve una lista con toda la información relacionada a las instituciones. Acceso permitido para cualquier usuario autenticado.
 *     tags: [Institutions]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Lista de instituciones obtenida correctamente
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 description: Información detallada de una institución
 *       401:
 *         description: No autorizado, token inválido o no proporcionado
 *       500:
 *         description: Error interno del servidor
 */
router.get("/", requireToken, verifyAllUsers, getInstitutionsAllInformation);
/**
 * @swagger
 * /intitutions:
 *   post:
 *     summary: Registrar una nueva institución (Solo administrador)
 *     description: Permite a un administrador registrar una nueva institución en el sistema. Se validan datos y existencia previa.
 *     tags: [Institutions]
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
 *               - address
 *             properties:
 *               name:
 *                 type: string
 *                 description: Nombre de la institución
 *               address:
 *                 type: string
 *                 description: Dirección de la institución
 *             example:
 *               name: Universidad Nacional
 *               address: Calle Falsa 123
 *     responses:
 *       201:
 *         description: Institución registrada exitosamente
 *       400:
 *         description: Datos inválidos o institución ya existente
 *       401:
 *         description: No autorizado, token inválido o no proporcionado
 *       500:
 *         description: Error interno del servidor
 */
router.post(
  "/",
  requireToken,
  verifyAdmin,
  validateExistingInstitution,
  validationRegisterInstitution,
  registerInstitution
);
/**
 * @swagger
 * /{institutionId}:
 *   put:
 *     summary: Actualizar una institución existente (Solo administrador)
 *     description: Permite a un administrador actualizar la información de una institución mediante su ID.
 *     tags: [Institutions]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: institutionId
 *         schema:
 *           type: string
 *         required: true
 *         description: ID de la institución a actualizar
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 description: Nombre actualizado de la institución
 *               address:
 *                 type: string
 *                 description: Dirección actualizada de la institución
 *             example:
 *               name: Universidad Nacional Actualizada
 *               address: Calle Nueva 456
 *     responses:
 *       200:
 *         description: Institución actualizada correctamente
 *       400:
 *         description: Datos inválidos o formato incorrecto
 *       401:
 *         description: No autorizado, token inválido o no proporcionado
 *       404:
 *         description: Institución no encontrada con el ID especificado
 *       500:
 *         description: Error interno del servidor
 */
router.put(
  "/:institutionId",
  requireToken,
  verifyAdmin,
  validationUpdateInstitution,
  updateInstitution
);
/**
 * @swagger
 * /{institutionId}:
 *   delete:
 *     summary: Eliminar una institución por ID (Solo administrador)
 *     description: Permite a un administrador eliminar una institución especificando su ID.
 *     tags: [Institutions]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: institutionId
 *         schema:
 *           type: string
 *         required: true
 *         description: ID de la institución a eliminar
 *     responses:
 *       200:
 *         description: Institución eliminada correctamente
 *       401:
 *         description: No autorizado, token inválido o no proporcionado
 *       404:
 *         description: Institución no encontrada con el ID especificado
 *       500:
 *         description: Error interno del servidor
 */
router.delete("/:institutionId", requireToken, verifyAdmin, deleteInstitution);

export default router;
