import { Router } from "express";
import {
  deletePractitionerInformation,
  getPractitionerInformation,
  registerPractitionerInformation,
  updatePractitionerInformation,
} from "../controllers/practitioner-Information/practitionerInformationController.js";
import { validationRegisterPractitionerInformation } from "../middlewares/practitioner-Information/validatedRegiterPractitionerInformation.js";
import { validationUpdatePractitionerInformation } from "../middlewares/practitioner-Information/validatedUpdatePractitionerInformation.js";
const router = Router();

router.get("/", getPractitionerInformation);
router.post(
  "/:userId",
  validationRegisterPractitionerInformation,
  registerPractitionerInformation
);
router.put(
  "/:userId",
  validationUpdatePractitionerInformation,
  updatePractitionerInformation
);
router.delete("/:informationId", deletePractitionerInformation);

export default router;
