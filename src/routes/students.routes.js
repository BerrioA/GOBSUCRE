import { Router } from "express";
import {
  getStudentByDocumentId,
  getStudentById,
  getStudents,
} from "../controllers/students/studentsController.js";
import { requireToken } from "../middlewares/auth/requireToken.js";
import { verifyAdmin, verifyAllUsers } from "../middlewares/auth/verifyUser.js";

const router = Router();

// Rutas para la gestión de estudiantes

/**
 * @swagger
 * /students:
 *   get:
 *     summary: Obtener todos los estudiantes (solo administradores)
 *     tags: [Students]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Lista de todos los estudiantes
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/BasicStudent'
 *       401:
 *         description: Token inválido o no proporcionado
 *       403:
 *         description: Acceso denegado. Se requiere rol de administrador
 *       500:
 *         description: Error del servidor
 */
router.get("/", requireToken, verifyAdmin, getStudents);

/**
 * @swagger
 * /students/{studentId}:
 *   get:
 *     summary: Obtener información completa de un estudiante por ID
 *     tags: [Students]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: studentId
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID del estudiante
 *     responses:
 *       200:
 *         description: Información del estudiante encontrada
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/FullStudent'
 *       400:
 *         description: Parámetro faltante o inválido
 *       401:
 *         description: Token inválido o no proporcionado
 *       404:
 *         description: Estudiante no encontrado
 *       500:
 *         description: Error del servidor
 */
router.get("/:studentId", requireToken, verifyAllUsers, getStudentById);

/**
 * @swagger
 * /students/document/{documentId}:
 *   get:
 *     summary: Buscar estudiante por número de documento (solo administradores)
 *     tags: [Students]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: documentId
 *         required: true
 *         schema:
 *           type: string
 *         description: Número de documento del estudiante
 *     responses:
 *       200:
 *         description: Información del estudiante encontrada
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/FullStudent'
 *       400:
 *         description: El número de documento es requerido
 *       401:
 *         description: Token inválido o no proporcionado
 *       403:
 *         description: Acceso denegado. Se requiere rol de administrador
 *       404:
 *         description: Estudiante no encontrado
 *       500:
 *         description: Error del servidor
 */
router.get("/document/:documentId", requireToken, verifyAdmin, getStudentByDocumentId);

/**
 * @swagger
 * components:
 *   schemas:
 *     BasicStudent:
 *       type: object
 *       properties:
 *         id:
 *           type: integer
 *         name:
 *           type: string
 *         middle_name:
 *           type: string
 *         last_name:
 *           type: string
 *         second_last_name:
 *           type: string
 *         document_type:
 *           type: string
 *         document_number:
 *           type: string
 *         cellphone:
 *           type: string
 *         email:
 *           type: string
 *         role:
 *           type: object
 *           properties:
 *             role_name:
 *               type: string
 *
 *     FullStudent:
 *       type: object
 *       properties:
 *         id:
 *           type: integer
 *         name:
 *           type: string
 *         middle_name:
 *           type: string
 *         last_name:
 *           type: string
 *         second_last_name:
 *           type: string
 *         document_type:
 *           type: string
 *         document_number:
 *           type: string
 *         cellphone:
 *           type: string
 *         email:
 *           type: string
 *         role_name:
 *           type: string
 *         start_date:
 *           type: string
 *           format: date
 *         end_date:
 *           type: string
 *           format: date
 *         status:
 *           type: string
 *         institution_name:
 *           type: string
 *         faculty_name:
 *           type: string
 *         program_name:
 *           type: string
 *         documents:
 *           type: array
 *           items:
 *             type: object
 *             properties:
 *               document:
 *                 type: string
 *               fileUrl:
 *                 type: string
 *               document_name:
 *                 type: string
 */


export default router;
