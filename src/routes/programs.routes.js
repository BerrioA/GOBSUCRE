import { Router } from "express";
import { registerProgram } from "../controllers/programs/programsController.js";

const router = Router();

router.post("/", registerProgram);

export default router;
