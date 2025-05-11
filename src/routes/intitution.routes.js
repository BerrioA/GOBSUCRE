import { Router } from "express";
import {
  getInstitutionsAllInformation,
  registerInstitution,
} from "../controllers/institutions/institutionController.js";

const router = Router();

router.get("/", getInstitutionsAllInformation);
router.post("/", registerInstitution);

export default router;
