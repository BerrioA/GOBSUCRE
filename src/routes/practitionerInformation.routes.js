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
router.put("/:informationId", updatePractitionerInformation);
router.delete("/:informationId", deletePractitionerInformation);

export default router;
