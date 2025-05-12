import { Router } from "express";
<<<<<<< HEAD
import { registerProgram } from "../controllers/programs/programsController.js";

const router = Router();

router.post("/", registerProgram);
=======
import {
  deleteProgram,
  getPrograms,
  registerProgram,
  updateProgram,
} from "../controllers/programs/programsController.js";

const router = Router();

router.get("/", getPrograms);
router.post("/", registerProgram);
router.put("/:programId", updateProgram);
router.delete("/:programId", deleteProgram);
>>>>>>> Correccion-controladores

export default router;
