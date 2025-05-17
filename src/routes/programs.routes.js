import { Router } from "express";
import {
  deleteProgram,
  getPrograms,
  registerProgram,
  updateProgram,
} from "../controllers/programs/programsController.js";
import {
  validationRegisterProgram,
  validationUpdateProgram,
} from "../middlewares/programs/validatedRegisterProgram.js";
import { validateExistingProgram } from "../middlewares/programs/validatedExistingProgram.js";
import { requireToken } from "../middlewares/auth/requireToken.js";
import { verifyAdmin, verifyAllUsers } from "../middlewares/auth/verifyUser.js";

const router = Router();

router.get("/", requireToken, verifyAllUsers, getPrograms);

router.post(
  "/",
  requireToken,
  verifyAdmin,
  validateExistingProgram,
  validationRegisterProgram,
  registerProgram
);

router.put(
  "/:programId",
  requireToken,
  verifyAdmin,
  validationUpdateProgram,
  updateProgram
);
router.delete("/:programId", requireToken, verifyAdmin, deleteProgram);

export default router;
