import { Router } from "express";
import {
  createSecretary,
  deleteSecretary,
  deleteUndersecretary,
  getDependencies,
} from "../controllers/dependencies/dependenciesController.js";
import { requireToken } from "../middlewares/auth/requireToken.js";
import { verifyAdmin, verifyAllUsers } from "../middlewares/auth/verifyUser.js";

const router = Router();

/**
 * @swagger
 * /dependencies:
 *   get:
 *     summary: Obtener todas las dependencias
 *     description: Retorna una lista de todas las dependencias disponibles. Accesible para cualquier usuario autenticado.
 *     tags: [Dependencias y subdependencias]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Lista de dependencias obtenida correctamente
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   id:
 *                     type: string
 *                     description: ID de la dependencia
 *                   name:
 *                     type: string
 *                     description: Nombre de la dependencia
 *               example:
 *                 - id: "dep123"
 *                   name: "Recursos Humanos"
 *                 - id: "dep456"
 *                   name: "Tecnología"
 *       401:
 *         description: No autorizado, token inválido o no proporcionado
 *       500:
 *         description: Error interno del servidor
 */

// Endpoints para las dependencias (EL ENPOINT GET, TRAE LAS DEPENDENCIAS Y LAS SUBDEPENDENCIAS DE ESTA)
router.get("/", requireToken, verifyAllUsers, getDependencies);
router.post("/", requireToken, verifyAdmin, createSecretary);
router.delete("/:dependencyId", requireToken, verifyAdmin, deleteSecretary);

// Endpoints para las Subdependencias
router.post("/sub", requireToken, verifyAdmin, createSecretary);
router.delete(
  "/sub/:subdependencyId",
  requireToken,
  verifyAdmin,
  deleteUndersecretary
);
export default router;
