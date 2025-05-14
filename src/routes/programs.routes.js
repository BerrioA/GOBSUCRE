import { Router } from "express";
import {
  deleteProgram,
  getPrograms,
  registerProgram,
  updateProgram,
} from "../controllers/programs/programsController.js";
import { validationUpdateProgram } from "../middlewares/programs/validatedUpdateProgram.js";
import { validationRegisterProgram } from "../middlewares/programs/validatedRegisterProgram.js";

const router = Router();

router.get("/", getPrograms);
router.post("/", validationRegisterProgram, registerProgram);
router.put("/:programId", validationUpdateProgram, updateProgram);
router.delete("/:programId", deleteProgram);

export default router;
