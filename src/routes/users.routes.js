import { Router } from "express";
import {
  deleteUser,
  getAllUsers,
  getUserById,
  registerUser,
  resetPassword,
  sendPasswordRecoveryUrl,
  updatePassword,
  updateUser,
} from "../controllers/users/userController.js";
import { validationRegisterUsers } from "../middlewares/users/validateRegisterUser.js";
import { validateExistingUser } from "../middlewares/users/validateExistingUser.js";
import {
  validationUpdatePassword,
  validationUpdateUsers,
} from "../middlewares/users/validateUpdateUser.js";
import { validateIdUser } from "../middlewares/params/validateIdUser.js";
import { requireToken } from "../middlewares/auth/requireToken.js";
import { verifyAdmin, verifyAllUsers } from "../middlewares/auth/verifyUser.js";
import { validationEmail } from "../middlewares/email/validatedEmail.js";

const router = Router();

// Rutas para la gestión de usuarios
/**
 * @swagger
 * /users:
 *   get:
 *     summary: Obtener todos los usuarios (solo administradores)
 *     tags: [Users]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Lista de todos los usuarios
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/User'
 *       401:
 *         description: Token inválido o no proporcionado
 *       403:
 *         description: Acceso denegado. Se requiere rol de administrador
 *       500:
 *         description: Error del servidor
 */
router.get("/", requireToken, verifyAdmin, getAllUsers);

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
 * /users:
 *   post:
 *     summary: Registrar un nuevo usuario con dirección
 *     tags: [Users]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/RegisterUserRequest'
 *     responses:
 *       201:
 *         description: Usuario registrado exitosamente
 *       400:
 *         description: Error de validación
 *       500:
 *         description: Error interno del servidor
 */

router.post("/", validateExistingUser, validationRegisterUsers, registerUser);
/**
 * @swagger
 * /users/{userId}:
 *   patch:
 *     summary: Actualizar información de un usuario
 *     tags: [Users]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: userId
 *         schema:
 *           type: string
 *         required: true
 *         description: ID del usuario a actualizar
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/User'
 *     responses:
 *       200:
 *         description: Usuario actualizado correctamente
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/User'
 *       400:
 *         description: Datos inválidos enviados
 *       401:
 *         description: No autorizado (token no válido o ausente)
 *       403:
 *         description: Acceso denegado (no es el propietario ni administrador)
 *       404:
 *         description: Usuario no encontrado
 *       500:
 *         description: Error interno del servidor
 */

router.patch(
  "/:userId",
  requireToken,
  verifyAllUsers,
  validationUpdateUsers,
  updateUser
);
/**
 * @swagger
 * /users/{userId}:
 *   delete:
 *     summary: Eliminar un usuario (solo administradores)
 *     description: Permite a un administrador eliminar un usuario específico por su ID. Requiere un token válido con permisos de administrador.
 *     tags: [Users]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: userId
 *         schema:
 *           type: string
 *         required: true
 *         description: ID del usuario que se desea eliminar
 *     responses:
 *       200:
 *         description: Usuario eliminado correctamente
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Usuario eliminado correctamente
 *       400:
 *         description: ID de usuario inválido
 *       401:
 *         description: No autorizado (token inválido o no proporcionado)
 *       403:
 *         description: Acceso denegado (no es administrador)
 *       404:
 *         description: Usuario no encontrado
 *       500:
 *         description: Error interno del servidor
 */

router.delete(
  "/:userId",
  requireToken,
  verifyAdmin,
  validateIdUser,
  deleteUser
);
/**
 * @swagger
 * /users/{userId}:
 *   get:
 *     summary: Obtener un usuario por ID (solo administradores)
 *     description: Devuelve los datos de un usuario específico según su ID. Solo accesible por administradores autenticados.
 *     tags: [Users]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: userId
 *         schema:
 *           type: string
 *         required: true
 *         description: ID del usuario que se desea consultar
 *     responses:
 *       200:
 *         description: Datos del usuario encontrados
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/UserWithAddress'
 *       400:
 *         description: ID de usuario inválido
 *       401:
 *         description: No autorizado (token inválido o ausente)
 *       403:
 *         description: Acceso denegado (solo administradores)
 *       404:
 *         description: Usuario no encontrado
 *       500:
 *         description: Error interno del servidor
 */

router.get("/:userId", requireToken, verifyAdmin, validateIdUser, getUserById);
/**
 * @swagger
 * /users/me/password:
 *   put:
 *     summary: Actualizar la contraseña del usuario autenticado
 *     description: Permite a cualquier usuario autenticado actualizar su contraseña actual.
 *     tags: [Users]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - currentPassword
 *               - newPassword
 *             properties:
 *               currentPassword:
 *                 type: string
 *                 description: Contraseña actual del usuario
 *               newPassword:
 *                 type: string
 *                 description: Nueva contraseña a establecer
 *             example:
 *               currentPassword: ContraseñaAnterior123
 *               newPassword: NuevaContraseñaSegura456
 *     responses:
 *       200:
 *         description: Contraseña actualizada correctamente
 *       400:
 *         description: Datos inválidos o contraseña actual incorrecta
 *       401:
 *         description: No autorizado (token inválido o ausente)
 *       500:
 *         description: Error interno del servidor
 */

router.put("/me/password", requireToken, verifyAllUsers, updatePassword);
/**
 * @swagger
 * /users/send-password-recovery:
 *   put:
 *     summary: Enviar enlace de recuperación de contraseña
 *     description: Envía un correo electrónico al usuario con un enlace para recuperar su contraseña.
 *     tags: [Users]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - email
 *             properties:
 *               email:
 *                 type: string
 *                 format: email
 *                 description: Correo electrónico del usuario registrado
 *             example:
 *               email: usuario@ejemplo.com
 *     responses:
 *       200:
 *         description: Correo de recuperación enviado exitosamente
 *       400:
 *         description: Email inválido o no registrado
 *       500:
 *         description: Error del servidor al enviar el correo
 */

router.put("/send-password-recovery", validationEmail, sendPasswordRecoveryUrl);
/**
 * @swagger
 * /users/reset-password/{verificationCode}:
 *   put:
 *     summary: Restablecer contraseña
 *     description: Permite al usuario restablecer su contraseña mediante un código de verificación recibido por correo electrónico.
 *     tags: [Users]
 *     parameters:
 *       - in: path
 *         name: verificationCode
 *         schema:
 *           type: string
 *         required: true
 *         description: Código de verificación enviado al correo del usuario
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - password
 *             properties:
 *               password:
 *                 type: string
 *                 description: Nueva contraseña del usuario
 *             example:
 *               password: NuevaContraseña123
 *     responses:
 *       200:
 *         description: Contraseña restablecida exitosamente
 *       400:
 *         description: Código de verificación inválido o contraseña no válida
 *       500:
 *         description: Error del servidor al restablecer la contraseña
 */

router.put(
  "/reset-password/:verificationCode",
  validationUpdatePassword,
  resetPassword
);

export default router;
