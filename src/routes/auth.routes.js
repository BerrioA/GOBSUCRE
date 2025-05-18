import { Router } from "express";
import {
  login,
  logout,
  profile,
  refreshToken,
} from "../controllers/auth/userAuthentication.js";
import { requireRefreshToken } from "../middlewares/auth/requireRefreshToken.js";
import { requireToken } from "../middlewares/auth/requireToken.js";
// import { validationLogin } from "../../middleware/validations/authValidations/authValidations.js";

const router = Router();

/**
 * @swagger
 * /login:
 *   post:
 *     summary: Iniciar sesión
 *     tags: [Auth]
 *     description: Inicia sesión con el correo electrónico y la contraseña del usuario. Retorna un token de acceso.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - email
 *               - password
 *             properties:
 *               email:
 *                 type: string
 *                 format: email
 *                 example: usuario@correo.com
 *               password:
 *                 type: string
 *                 format: password
 *                 example: contraseña123
 *     responses:
 *       200:
 *         description: Inicio de sesión exitoso
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 token:
 *                   type: string
 *                   description: Token JWT para autenticación
 *                   example: eyJhbGciOiJIUzI1NiIsInR5cCI6...
 *                 user:
 *                   type: object
 *                   description: Información básica del usuario autenticado
 *                   properties:
 *                     id:
 *                       type: string
 *                     name:
 *                       type: string
 *                     role:
 *                       type: string
 *       400:
 *         description: Credenciales incorrectas o datos incompletos
 *       500:
 *         description: Error interno del servidor
 */
router.post("/login", login);
/**
 * @swagger
 * /logout:
 *   post:
 *     summary: Cerrar sesión
 *     tags: [Auth]
 *     description: Finaliza la sesión del usuario actual. En sistemas basados en tokens, puede implicar el borrado del token del lado del cliente.
 *     responses:
 *       200:
 *         description: Sesión cerrada exitosamente
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Sesión cerrada correctamente
 *       401:
 *         description: Usuario no autenticado
 *       500:
 *         description: Error interno del servidor
 */
router.post("/logout", logout);
/**
 * @swagger
 * /refresh:
 *   get:
 *     summary: Obtener nuevo token de acceso
 *     tags: [Auth]
 *     description: Genera un nuevo token de acceso si el refresh token es válido.
 *     responses:
 *       200:
 *         description: Token de acceso generado exitosamente
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 accessToken:
 *                   type: string
 *                   example: eyJhbGciOiJIUzI1NiIsInR5cCI6...
 *       401:
 *         description: Refresh token inválido o expirado
 *       500:
 *         description: Error interno del servidor
 */
router.get("/refresh", requireRefreshToken, refreshToken);
/**
 * @swagger
 * /profile:
 *   get:
 *     summary: Obtener el perfil del usuario autenticado
 *     tags: [Auth]
 *     description: Devuelve la información del usuario basada en el token de acceso proporcionado.
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Información del usuario autenticado
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 user:
 *                   type: object
 *                   properties:
 *                     id:
 *                       type: string
 *                     name:
 *                       type: string
 *                     email:
 *                       type: string
 *                     role:
 *                       type: string
 *                   example:
 *                     id: "123"
 *                     name: "Juan Pérez"
 *                     email: "juan@example.com"
 *                     role: "student"
 *       401:
 *         description: No autorizado o token inválido
 *       500:
 *         description: Error interno del servidor
 */
router.get("/profile", requireToken, profile);

export default router;
