import { Router } from "express";
import {
  deletePractitionerInformation,
  getPractitionerInformation,
  registerPractitionerInformation,
  updatePractitionerInformation,
} from "../controllers/practitioner-Information/practitionerInformationController.js";

const router = Router();

router.get("/", getPractitionerInformation);
router.post("/:userId", registerPractitionerInformation);
router.post("/:informationId", updatePractitionerInformation);
router.post("/:informationId", deletePractitionerInformation);

export default router;
