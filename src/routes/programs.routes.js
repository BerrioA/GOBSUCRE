import { Router } from "express";
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

export default router;
