import { Router } from "express";
import { getStudentByDocumentId } from "../controllers/students/studentsController.js";

const router = Router();

router.get("/:documentId", getStudentByDocumentId);

export default router;
