import { Router } from "express";
import {
  getRoles,
  privateRegisterAdmin,
  updateUserRoleAdmin,
} from "../controllers/private-routes/privateRoutesController.js";
import { validateExistingUser } from "../middlewares/users/validateExistingUser.js";
import { validationRegisterUsers } from "../middlewares/users/validateRegisterUser.js";
import { requireToken } from "../middlewares/auth/requireToken.js";
import { verifyAdmin } from "../middlewares/auth/verifyUser.js";
import { validateIdUser } from "../middlewares/params/validateIdUser.js";

const router = Router();

// Obtener todos los roles
/**
 * @swagger
 * /roles:
 *   get:
 *     summary: Obtener la lista de roles (Solo administrador)
 *     description: Devuelve todos los roles disponibles. Acceso exclusivo para administradores.
 *     tags: [Rutas privadas]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Lista de roles obtenida correctamente
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   id:
 *                     type: string
 *                   name:
 *                     type: string
 *               example:
 *                 - id: "1"
 *                   name: "Admin"
 *                 - id: "2"
 *                   name: "User"
 *       401:
 *         description: No autorizado
 *       500:
 *         description: Error interno del servidor
 */
router.get("/roles", requireToken, verifyAdmin, getRoles);

// Registro del primer administrador
/**
 * @swagger
 * components:
 *   schemas:
 *     User:
 *       type: object
 *       required:
 *         - name
 *         - middle_name
 *         - last_name
 *         - second_last_name
 *         - document_type
 *         - document_number
 *         - cellphone
 *         - email
 *         - password
 *       properties:
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
 *         password:
 *           type: string
 *       example:
 *         name: Juan
 *         middle_name: Pablo
 *         last_name: García
 *         second_last_name: López
 *         document_type: DNI
 *         document_number: "12345678"
 *         cellphone: "912345678"
 *         email: juan@example.com
 *         password: contraseña123
 *
 *     Address:
 *       type: object
 *       required:
 *         - neighborhood
 *         - address
 *         - city
 *         - department
 *       properties:
 *         neighborhood:
 *           type: string
 *         address:
 *           type: string
 *         city:
 *           type: string
 *         department:
 *           type: string
 *       example:
 *         neighborhood: San Miguel
 *         address: Calle Las Flores 123
 *         city: Lima
 *         department: Lima
 *
 *     RegisterUserRequest:
 *       type: object
 *       required:
 *         - user
 *         - address
 *       properties:
 *         user:
 *           $ref: '#/components/schemas/User'
 *         address:
 *           $ref: '#/components/schemas/Address'
 */

/**
 * @swagger
 * /private-route/admin:
 *   post:
 *     summary: Registrar un usuario administrador privado (solo si no existe un admin aún)
 *     tags: [Rutas privadas]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/RegisterUserRequest'
 *     responses:
 *       201:
 *         description: Usuario administrador registrado correctamente
 *       400:
 *         description: Validación fallida o usuario ya existe
 *       500:
 *         description: Error interno del servidor
 */
router.post(
  "/",
  validateExistingUser,
  validationRegisterUsers,
  privateRegisterAdmin
);

// Actualizar rol de usuario
/**
 * @swagger
 * /update-role/{userId}:
 *   patch:
 *     summary: Actualizar el rol de un usuario (solo administradores)
 *     description: El administrador debe confirmar su identidad proporcionando su contraseña para cambiar el rol de otro usuario.
 *     tags: [Rutas privadas]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: userId
 *         schema:
 *           type: string
 *         required: true
 *         description: ID del usuario cuyo rol se desea actualizar
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - rolId
 *               - password
 *             properties:
 *               rolId:
 *                 type: string
 *                 description: ID del nuevo rol a asignar
 *               password:
 *                 type: string
 *                 description: Contraseña del administrador (para verificar identidad)
 *             example:
 *               rolId: "64f1c3a23f9f7b0012f3d5c1"
 *               password: "adminpassword123"
 *     responses:
 *       200:
 *         description: Rol actualizado correctamente
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Rol de usuario actualizado correctamente.
 *       400:
 *         description: Datos inválidos o malformados
 *       401:
 *         description: Token inválido o no proporcionado
 *       403:
 *         description: Credenciales incorrectas (contraseña incorrecta)
 *       404:
 *         description: Usuario o rol no encontrado
 *       500:
 *         description: Error interno del servidor
 */
router.patch(
  "/update-role/:userId",
  requireToken,
  verifyAdmin,
  validateIdUser,
  updateUserRoleAdmin
);

export default router;
