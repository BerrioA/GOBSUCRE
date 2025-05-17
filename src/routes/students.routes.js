import { Router } from "express";
import {
  getStudentByDocumentId,
  getStudents,
} from "../controllers/students/studentsController.js";
import { requireToken } from "../middlewares/auth/requireToken.js";
import { verifyAdmin } from "../middlewares/auth/verifyUser.js";

const router = Router();

router.get("/", requireToken, verifyAdmin, getStudents);
router.get("/:documentId", requireToken, verifyAdmin, getStudentByDocumentId);

export default router;
