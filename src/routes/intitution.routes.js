import { Router } from "express";
import {
  deleteInstitution,
  getInstitutionsAllInformation,
  registerInstitution,
  updateInstitution,
} from "../controllers/institutions/institutionController.js";
import {
  validationRegisterInstitution,
  validationUpdateInstitution,
} from "../middlewares/institutions/validatedRegisterInstitution.js";
import { requireToken } from "../middlewares/auth/requireToken.js";
import { verifyAdmin, verifyAllUsers } from "../middlewares/auth/verifyUser.js";
import { validateExistingInstitution } from "../middlewares/institutions/validatedExistingInstitution.js";

const router = Router();

router.get("/", requireToken, verifyAllUsers, getInstitutionsAllInformation);
router.post(
  "/",
  requireToken,
  verifyAdmin,
  validateExistingInstitution,
  validationRegisterInstitution,
  registerInstitution
);
router.put(
  "/:institutionId",
  requireToken,
  verifyAdmin,
  validationUpdateInstitution,
  updateInstitution
);
router.delete("/:institutionId", requireToken, verifyAdmin, deleteInstitution);

export default router;
