import { Router } from "express";
import {
  deleteInstitution,
  getInstitutionsAllInformation,
  registerInstitution,
  updateInstitution,
} from "../controllers/institutions/institutionController.js";

const router = Router();

router.get("/", getInstitutionsAllInformation);
router.post("/", registerInstitution);
router.put("/:institutionId", updateInstitution);
router.delete("/:institutionId", deleteInstitution);

export default router;
