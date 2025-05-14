import { Router } from "express";
import {
  deleteInstitution,
  getInstitutionsAllInformation,
  registerInstitution,
  updateInstitution,
} from "../controllers/institutions/institutionController.js";
import { validationRegisterInstitution } from "../middlewares/institutions/validatedRegisterInstitution.js";
import { validationUpdateInstitution } from "../middlewares/institutions/validatedUpdateInstitution.js";

const router = Router();

router.get("/", getInstitutionsAllInformation);
router.post("/", validationRegisterInstitution, registerInstitution);
router.put("/:institutionId", validationUpdateInstitution, updateInstitution);
router.delete("/:institutionId", deleteInstitution);

export default router;
