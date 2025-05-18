import { Router } from "express";
import {
  deleteProgram,
  getPrograms,
  registerProgram,
  updateProgram,
} from "../controllers/programs/programsController.js";
import {
  validationRegisterProgram,
  validationUpdateProgram,
} from "../middlewares/programs/validatedRegisterProgram.js";
import { validateExistingProgram } from "../middlewares/programs/validatedExistingProgram.js";
import { requireToken } from "../middlewares/auth/requireToken.js";
import { verifyAdmin, verifyAllUsers } from "../middlewares/auth/verifyUser.js";

const router = Router();

/**
 * @swagger
 * /programs:
 *   get:
 *     summary: Obtener todos los programas académicos
 *     tags: [Programs]
 *     description: Retorna la lista de programas registrados. Accesible por cualquier usuario autenticado.
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Lista de programas académicos
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Program'
 *       401:
 *         description: No autorizado
 *       403:
 *         description: Acceso denegado
 *       500:
 *         description: Error interno del servidor
 */

router.get("/", requireToken, verifyAllUsers, getPrograms);

/**
 * @swagger
 * /programs:
 *   post:
 *     summary: Registrar un nuevo programa académico (Solo administrador)
 *     description: Ruta para que un administrador registre un nuevo programa en el sistema.
 *     tags: [Programs]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 description: Nombre del programa académico
 *               facultyId:
 *                 type: string
 *                 description: ID de la facultad asociada al programa
 *             required:
 *               - name
 *               - facultyId
 *             example:
 *               name: Ingeniería de Sistemas
 *               facultyId: "66507a1535fdc62185c1b227"
 *     responses:
 *       201:
 *         description: Programa registrado exitosamente
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Programa registrado correctamente
 *       400:
 *         description: Datos inválidos o programa ya existente
 *       401:
 *         description: No autorizado
 *       403:
 *         description: Acceso denegado (solo administradores)
 *       500:
 *         description: Error interno del servidor
 */

router.post(
  "/",
  requireToken,
  verifyAdmin,
  validateExistingProgram,
  validationRegisterProgram,
  registerProgram
);

/**
 * @swagger
 * /programs/{programId}:
 *   put:
 *     summary: Actualizar información de un programa académico
 *     tags: [Programs]
 *     description: Permite al administrador actualizar el nombre o la facultad de un programa.
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: programId
 *         required: true
 *         schema:
 *           type: string
 *         description: ID del programa a actualizar
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 description: Nuevo nombre del programa
 *               facultyId:
 *                 type: string
 *                 description: ID de la facultad asociada
 *             example:
 *               name: Ingeniería de Sistemas
 *               facultyId: "66507a1535fdc62185c1b227"
 *     responses:
 *       200:
 *         description: Programa actualizado exitosamente
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Programa actualizado correctamente
 *       400:
 *         description: Datos inválidos
 *       401:
 *         description: No autorizado
 *       403:
 *         description: Acceso denegado (solo administradores)
 *       404:
 *         description: Programa no encontrado
 *       500:
 *         description: Error interno del servidor
 */
router.put(
  "/:programId",
  requireToken,
  verifyAdmin,
  validationUpdateProgram,
  updateProgram
);
/**
 * @swagger
 * /programs/{programId}:
 *   delete:
 *     summary: Eliminar un programa académico
 *     tags: [Programs]
 *     description: Permite a un administrador eliminar un programa por su ID.
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: programId
 *         required: true
 *         schema:
 *           type: string
 *         description: ID del programa a eliminar
 *     responses:
 *       200:
 *         description: Programa eliminado exitosamente
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Programa eliminado correctamente
 *       401:
 *         description: No autorizado
 *       403:
 *         description: Acceso denegado (solo administradores)
 *       404:
 *         description: Programa no encontrado
 *       500:
 *         description: Error interno del servidor
 */
router.delete("/:programId", requireToken, verifyAdmin, deleteProgram);

export default router;
