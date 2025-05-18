import { Router } from "express";
import {
  deleteFaculty,
  getFaculties,
  registerFaculty,
  updateFaculty,
} from "../controllers/faculties/facultiesController.js";
import {
  validationRegisterFaculties,
  validationUpdateFaculties,
} from "../middlewares/faculties/validatedFaculties.js";
import { verifyAdmin, verifyAllUsers } from "../middlewares/auth/verifyUser.js";
import { requireToken } from "../middlewares/auth/requireToken.js";

const router = Router();

/**
 * @swagger
 * /faculties:
 *   get:
 *     summary: Obtener todas las facultades
 *     description: Devuelve una lista con todas las facultades disponibles en el sistema.
 *     tags: [Faculties]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Lista de facultades obtenida correctamente
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   id:
 *                     type: string
 *                     description: ID de la facultad
 *                   name:
 *                     type: string
 *                     description: Nombre de la facultad
 *                 example:
 *                   id: "123"
 *                   name: "Facultad de Ingeniería"
 *       401:
 *         description: No autorizado, token inválido o no proporcionado
 *       403:
 *         description: Acceso denegado
 *       500:
 *         description: Error interno del servidor
 */
router.get("/", requireToken, verifyAllUsers, getFaculties);
/**
 * @swagger
 * /faculties:
 *   post:
 *     summary: Registrar una nueva facultad (Solo administrador)
 *     description: Permite a un administrador crear una nueva facultad en el sistema.
 *     tags: [Faculties]
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
 *                 description: Nombre de la facultad a registrar
 *             example:
 *               name: "Facultad de Ciencias Sociales"
 *     responses:
 *       201:
 *         description: Facultad creada correctamente
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: string
 *                   description: ID generado de la facultad
 *                 name:
 *                   type: string
 *                   description: Nombre de la facultad registrada
 *               example:
 *                 id: "abc123"
 *                 name: "Facultad de Ciencias Sociales"
 *       400:
 *         description: Error de validación, datos inválidos o faltantes
 *       401:
 *         description: No autorizado, token inválido o no proporcionado
 *       403:
 *         description: Acceso denegado, solo administradores pueden crear facultades
 *       500:
 *         description: Error interno del servidor
 */
router.post(
  "/",
  requireToken,
  verifyAdmin,
  validationRegisterFaculties,
  registerFaculty
);
/**
 * @swagger
 * /faculties/{facultyId}:
 *   put:
 *     summary: Actualizar una facultad existente (Solo administrador)
 *     description: Permite a un administrador actualizar los datos de una facultad por su ID.
 *     tags: [Faculties]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: facultyId
 *         required: true
 *         schema:
 *           type: string
 *         description: ID de la facultad a actualizar
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 description: Nuevo nombre para la facultad
 *             example:
 *               name: "Facultad de Ingeniería"
 *     responses:
 *       200:
 *         description: Facultad actualizada correctamente
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: string
 *                   description: ID de la facultad actualizada
 *                 name:
 *                   type: string
 *                   description: Nombre actualizado de la facultad
 *               example:
 *                 id: "abc123"
 *                 name: "Facultad de Ingeniería"
 *       400:
 *         description: Datos inválidos o error de validación
 *       401:
 *         description: No autorizado, token inválido o no proporcionado
 *       403:
 *         description: Acceso denegado, solo administradores pueden actualizar facultades
 *       404:
 *         description: Facultad no encontrada con el ID proporcionado
 *       500:
 *         description: Error interno del servidor
 */
router.put(
  "/:facultyId",
  requireToken,
  verifyAdmin,
  validationUpdateFaculties,
  updateFaculty
);
/**
 * @swagger
 * /faculties/{facultyId}:
 *   delete:
 *     summary: Eliminar una facultad por ID (Solo administrador)
 *     description: Permite a un administrador eliminar una facultad específica usando su ID.
 *     tags: [Faculties]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: facultyId
 *         required: true
 *         schema:
 *           type: string
 *         description: ID de la facultad a eliminar
 *     responses:
 *       200:
 *         description: Facultad eliminada correctamente
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Facultad eliminada exitosamente
 *       401:
 *         description: No autorizado, token inválido o no proporcionado
 *       403:
 *         description: Acceso denegado, solo administradores pueden eliminar facultades
 *       404:
 *         description: Facultad no encontrada con el ID proporcionado
 *       500:
 *         description: Error interno del servidor
 */
router.delete("/:facultyId", requireToken, verifyAdmin, deleteFaculty);

export default router;
