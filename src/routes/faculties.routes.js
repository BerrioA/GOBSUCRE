import { Router } from "express";
<<<<<<< HEAD
import { registerFaculty } from "../controllers/faculties/facultiesController.js";

const router = Router();

router.post("/", registerFaculty);
=======
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
>>>>>>> Correccion-controladores

export default router;
