import { Router } from "express";
import { getDependencies } from "../controllers/dependencies/dependenciesController.js";
import { requireToken } from "../middlewares/auth/requireToken.js";
import { verifyAllUsers } from "../middlewares/auth/verifyUser.js";

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

router.get("/", requireToken, verifyAllUsers, getDependencies);

export default router;
