import { Router } from "express";
import {
  deletePractitionerInformation,
  getPractitionerInformation,
  registerPractitionerInformation,
  updatePractitionerInformation,
  updatePractitionerInformationByAdmin,
} from "../controllers/practitioner-Information/practitionerInformationController.js";

const router = Router();

router.get("/", getPractitionerInformation);

router.post("/:userId", registerPractitionerInformation);

router.put("/:informationId", updatePractitionerInformation);

router.put(
  "/admin/update-info/:informationId",
  updatePractitionerInformationByAdmin
);

router.delete("/:informationId", deletePractitionerInformation);

export default router;
