import { Router } from "express";
import {
<<<<<<< HEAD
  getInstitutionsAllInformation,
  registerInstitution,
=======
  deleteInstitution,
  getInstitutionsAllInformation,
  registerInstitution,
  updateInstitution,
>>>>>>> Correccion-controladores
} from "../controllers/institutions/institutionController.js";

const router = Router();

router.get("/", getInstitutionsAllInformation);
router.post("/", registerInstitution);
<<<<<<< HEAD
=======
router.put("/:institutionId", updateInstitution);
router.delete("/:institutionId", deleteInstitution);
>>>>>>> Correccion-controladores

export default router;
