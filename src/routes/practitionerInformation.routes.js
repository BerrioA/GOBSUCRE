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
<<<<<<< HEAD
router.post("/:informationId", updatePractitionerInformation);
router.post("/:informationId", deletePractitionerInformation);
=======
router.put("/:informationId", updatePractitionerInformation);
router.delete("/:informationId", deletePractitionerInformation);
>>>>>>> Correccion-controladores

export default router;
