import { Router } from "express";
import {
  deletePractitionerInformation,
  getPractitionerInformation,
  registerPractitionerInformation,
  registerPractitionerInformationByAdmin,
  updatePractitionerInformation,
  updatePractitionerInformationByAdmin,
} from "../controllers/practitioner-Information/practitionerInformationController.js";
import {
  validateRegisterPractitonerInformation,
  validateUpdatePractitonerInformation,
} from "../middlewares/practitioner-Information/validatedRegisterPractitionerInformation.js";
import { requireToken } from "../middlewares/auth/requireToken.js";
import { verifyAdmin, verifyStudent } from "../middlewares/auth/verifyUser.js";
import { validateIdUser } from "../middlewares/params/validateIdUser.js";
import { validateExistingInformationUser } from "../middlewares/practitioner-Information/validatedExistingPractitionerInformation.js";

const router = Router();

router.get("/", requireToken, verifyAdmin, getPractitionerInformation);

router.post(
  "/:userId",
  requireToken,
  verifyStudent,
  validateIdUser,
  validateExistingInformationUser,
  validateRegisterPractitonerInformation,
  registerPractitionerInformation
);

router.post(
  "/admin/register/:userId",
  requireToken,
  verifyAdmin,
  validateIdUser,
  validateExistingInformationUser,
  validateRegisterPractitonerInformation,
  registerPractitionerInformationByAdmin
);

router.put(
  "/:informationId",
  requireToken,
  verifyStudent,
  validateUpdatePractitonerInformation,
  updatePractitionerInformation
);

router.put(
  "/admin/update/:informationId",
  requireToken,
  verifyAdmin,
  validateUpdatePractitonerInformation,
  updatePractitionerInformationByAdmin
);

router.delete(
  "/:informationId",
  requireToken,
  verifyAdmin,
  deletePractitionerInformation
);

export default router;
