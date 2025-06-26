import { Router } from "express";
import {
  getStudentByDocumentId,
  getStudentById,
  getStudents,
} from "../controllers/students/studentsController.js";
import { requireToken } from "../middlewares/auth/requireToken.js";
import { verifyAdmin, verifyAllUsers } from "../middlewares/auth/verifyUser.js";

const router = Router();

router.get("/", requireToken, verifyAdmin, getStudents);
router.get("/:studentId", requireToken, verifyAllUsers, getStudentById);
router.get("/:documentId", requireToken, verifyAdmin, getStudentByDocumentId);

export default router;
