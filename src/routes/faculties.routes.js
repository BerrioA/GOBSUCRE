import { Router } from "express";
import {
  deleteFaculty,
  getFaculties,
  registerFaculty,
  updateFaculty,
} from "../controllers/faculties/facultiesController.js";

const router = Router();

router.get("/", getFaculties);
router.post("/", registerFaculty);
router.put("/:facultyId", updateFaculty);
router.delete("/:facultyId", deleteFaculty);

export default router;
