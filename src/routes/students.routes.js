import { Router } from "express";
import {
  getStudentByDocumentId,
  getStudents,
} from "../controllers/students/studentsController.js";

const router = Router();

router.get("/", getStudents);
router.get("/:documentId", getStudentByDocumentId);

export default router;
