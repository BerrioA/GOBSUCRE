import { Router } from "express";
<<<<<<< HEAD
import { getStudentByDocumentId } from "../controllers/students/studentsController.js";

const router = Router();

=======
import {
  getStudentByDocumentId,
  getStudents,
} from "../controllers/students/studentsController.js";

const router = Router();

router.get("/", getStudents);
>>>>>>> Correccion-controladores
router.get("/:documentId", getStudentByDocumentId);

export default router;
