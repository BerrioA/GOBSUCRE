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

// Todos los roles
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
 *                     description: ID del rol
 *                   name:
 *                     type: string
 *                     description: Nombre del rol
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

// Registro de primer administrador con rol Administrador

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
 *     summary: Registrar un usuario administrador privado (Solo permite utilizar esta ruta una vez si no existe administrador)
 *     tags: [Rutas privadas]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/RegisterUserRequest'
 *     responses:
 *       201:
 *         description: Usuario administrador privado registrado correctamente
 *       400:
 *         description: Error de validación o usuario ya existente
 *       500:
 *         description: Error interno del servidor
 */

router.post(
  "/",
  validateExistingUser,
  validationRegisterUsers,
  privateRegisterAdmin
);

/**
 * @swagger
 * /update-role/{userId}:
 *   patch:
 *     summary: Actualizar el rol de un usuario (Solo administrador)
 *     description: Permite a un administrador actualizar el rol asignado a un usuario específico.
 *     tags: [Rutas privadas]
 *     parameters:
 *       - in: path
 *         name: userId
 *         schema:
 *           type: string
 *         required: true
 *         description: ID del usuario al que se le actualizará el rol
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               role_id:
 *                 type: string
 *                 description: ID del nuevo rol a asignar al usuario
 *             required:
 *               - rolId
 *             example:
 *               roleId: "64f1c3a23f9f7b0012f3d5c1"
 *     responses:
 *       200:
 *         description: Rol actualizado exitosamente
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Rol actualizado correctamente
 *       400:
 *         description: Datos inválidos o ID de usuario incorrecto
 *       401:
 *         description: No autorizado
 *       403:
 *         description: Acceso denegado (solo administradores)
 *       404:
 *         description: Usuario no encontrado
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
