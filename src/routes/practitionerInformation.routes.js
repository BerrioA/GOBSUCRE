import { Router } from "express";
import {
  deletePractitionerInformation,
  getPractitionerInformation,
  registerPractitionerInformation,
  registerPractitionerInformationByAdmin,
  updatePractitionerInformation,
  updatePractitionerInformationByAdmin,
} from "../controllers/practitioner-Information/practitionerInformationController.js";
import {
  validateRegisterPractitonerInformation,
  validateUpdatePractitonerInformation,
} from "../middlewares/practitioner-Information/validatedRegisterPractitionerInformation.js";
import { requireToken } from "../middlewares/auth/requireToken.js";
import { verifyAdmin, verifyStudent } from "../middlewares/auth/verifyUser.js";
import { validateIdUser } from "../middlewares/params/validateIdUser.js";
import { validateExistingInformationUser } from "../middlewares/practitioner-Information/validatedExistingPractitionerInformation.js";

const router = Router();

/**
 * @swagger
 * /practitioner-information:
 *   get:
 *     summary: Obtener información de practicantes (Solo administrador)
 *     description: Retorna la información de todos los practicantes. Solo accesible para usuarios administradores.
 *     tags: [Información de practicantes]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Lista de practicantes obtenida exitosamente
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 description: Objeto con la información de un practicante
 *       401:
 *         description: No autorizado
 *       500:
 *         description: Error del servidor al obtener la información
 */

router.get("/", requireToken, verifyAdmin, getPractitionerInformation);
/**
 * @swagger
 * /practitioner-information:
 *   post:
 *     summary: Registrar información del practicante para un estudiante autenticado
 *     description: Permite a un estudiante autenticado registrar su información de practicante.
 *     tags: [Información de practicantes]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: userId
 *         schema:
 *           type: string
 *         required: true
 *         description: ID del usuario estudiante para quien se registra la información del practicante
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               practiceStartDate:
 *                 type: string
 *                 format: date
 *                 description: Fecha de inicio de la práctica
 *               practiceArea:
 *                 type: string
 *                 description: Área de práctica asignada
 *               dependency:
 *                 type: string
 *                 description: Dependencia asignada al practicante
 *               subDependency:
 *                 type: string
 *                 description: Subdependencia asignada al practicante
 *             required:
 *               - practiceStartDate
 *               - practiceArea
 *               - dependency
 *     responses:
 *       201:
 *         description: Información del practicante registrada correctamente
 *       400:
 *         description: Error en la validación de datos o información existente
 *       401:
 *         description: No autorizado
 *       403:
 *         description: Acceso prohibido para este usuario
 *       500:
 *         description: Error del servidor
 */

router.post(
  "/",
  requireToken,
  verifyStudent,
  validateIdUser,
  validateExistingInformationUser,
  validateRegisterPractitonerInformation,
  registerPractitionerInformation
);
/**
 * @swagger
 * /practitioner-information/admin/register/{userId}:
 *   post:
 *     summary: Registrar información del practicante para un usuario (Solo administrador)
 *     description: Permite a un administrador autenticado registrar la información del practicante para un usuario específico.
 *     tags: [Información de practicantes]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: userId
 *         schema:
 *           type: string
 *         required: true
 *         description: ID del usuario para quien se registra la información del practicante
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               practiceStartDate:
 *                 type: string
 *                 format: date
 *                 description: Fecha de inicio de la práctica
 *               practiceArea:
 *                 type: string
 *                 description: Área de práctica asignada
 *               dependency:
 *                 type: string
 *                 description: Dependencia asignada al practicante
 *               subDependency:
 *                 type: string
 *                 description: Subdependencia asignada al practicante
 *             required:
 *               - practiceStartDate
 *               - practiceArea
 *               - dependency
 *     responses:
 *       201:
 *         description: Información del practicante registrada correctamente por administrador
 *       400:
 *         description: Error en la validación de datos o información existente
 *       401:
 *         description: No autorizado
 *       403:
 *         description: Acceso prohibido para este usuario
 *       500:
 *         description: Error del servidor
 */

router.post(
  "/admin/register/:userId",
  requireToken,
  verifyAdmin,
  validateIdUser,
  validateExistingInformationUser,
  validateRegisterPractitonerInformation,
  registerPractitionerInformationByAdmin
);

/**
 * @swagger
 * /practitioner-information/{informationId}:
 *   put:
 *     summary: Actualizar información del practicante (Solo estudiante)
 *     description: Permite a un estudiante autenticado actualizar su información de practicante mediante su ID.
 *     tags: [Información de practicantes]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: informationId
 *         schema:
 *           type: string
 *         required: true
 *         description: ID de la información del practicante a actualizar
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               practiceStartDate:
 *                 type: string
 *                 format: date
 *                 description: Fecha actualizada de inicio de la práctica
 *               practiceArea:
 *                 type: string
 *                 description: Área de práctica actualizada
 *               dependency:
 *                 type: string
 *                 description: Dependencia actualizada
 *               subDependency:
 *                 type: string
 *                 description: Subdependencia actualizada
 *             required:
 *               - practiceStartDate
 *               - practiceArea
 *               - dependency
 *     responses:
 *       200:
 *         description: Información del practicante actualizada correctamente
 *       400:
 *         description: Datos inválidos o error en validación
 *       401:
 *         description: No autorizado
 *       403:
 *         description: Acceso prohibido
 *       404:
 *         description: Información del practicante no encontrada
 *       500:
 *         description: Error del servidor
 */

router.put(
  "/:informationId",
  requireToken,
  verifyStudent,
  validateUpdatePractitonerInformation,
  updatePractitionerInformation
);

/**
 * @swagger
 * /practitioner-information/admin/update/{informationId}:
 *   put:
 *     summary: Actualizar información del practicante (Solo administrador)
 *     description: Permite a un administrador autenticado actualizar la información de un practicante mediante su ID.
 *     tags: [Información de practicantes]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: informationId
 *         schema:
 *           type: string
 *         required: true
 *         description: ID de la información del practicante a actualizar
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               practiceStartDate:
 *                 type: string
 *                 format: date
 *                 description: Fecha actualizada de inicio de la práctica
 *               practiceArea:
 *                 type: string
 *                 description: Área de práctica actualizada
 *               dependency:
 *                 type: string
 *                 description: Dependencia actualizada
 *               subDependency:
 *                 type: string
 *                 description: Subdependencia actualizada
 *             required:
 *               - practiceStartDate
 *               - practiceArea
 *               - dependency
 *     responses:
 *       200:
 *         description: Información del practicante actualizada correctamente
 *       400:
 *         description: Datos inválidos o error en validación
 *       401:
 *         description: No autorizado
 *       403:
 *         description: Acceso prohibido
 *       404:
 *         description: Información del practicante no encontrada
 *       500:
 *         description: Error del servidor
 */

router.put(
  "/admin/update/:informationId",
  requireToken,
  verifyAdmin,
  validateUpdatePractitonerInformation,
  updatePractitionerInformationByAdmin
);

/**
 * @swagger
 * /practitioner-information/{informationId}:
 *   delete:
 *     summary: Eliminar información del practicante (Solo administrador)
 *     description: Permite a un administrador autenticado eliminar la información de un practicante por su ID.
 *     tags: [Información de practicantes]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: informationId
 *         schema:
 *           type: string
 *         required: true
 *         description: ID de la información del practicante a eliminar
 *     responses:
 *       200:
 *         description: Información del practicante eliminada correctamente
 *       401:
 *         description: No autorizado
 *       403:
 *         description: Acceso prohibido
 *       404:
 *         description: Información del practicante no encontrada
 *       500:
 *         description: Error del servidor
 */

router.delete(
  "/:informationId",
  requireToken,
  verifyAdmin,
  deletePractitionerInformation
);

export default router;
