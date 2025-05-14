import { Router } from "express";
import {
  deleteFaculty,
  getFaculties,
  registerFaculty,
  updateFaculty,
} from "../controllers/faculties/facultiesController.js";
import { validationRegisterFaculty } from "../middlewares/faculties/validatedRegisterFaculties.js";
import { validationUpdateFaculty } from "../middlewares/faculties/validatedUpdateFaculties.js";

const router = Router();

router.get("/", getFaculties);
router.post("/", validationRegisterFaculty, registerFaculty);
router.put("/:facultyId", validationUpdateFaculty, updateFaculty);
router.delete("/:facultyId", deleteFaculty);

export default router;
