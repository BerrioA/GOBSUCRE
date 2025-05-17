import { Router } from "express";
import {
  deleteFaculty,
  getFaculties,
  registerFaculty,
  updateFaculty,
} from "../controllers/faculties/facultiesController.js";
import {
  validationRegisterFaculties,
  validationUpdateFaculties,
} from "../middlewares/faculties/validatedFaculties.js";
import { verifyAdmin, verifyAllUsers } from "../middlewares/auth/verifyUser.js";
import { requireToken } from "../middlewares/auth/requireToken.js";

const router = Router();

router.get("/", requireToken, verifyAllUsers, getFaculties);
router.post(
  "/",
  requireToken,
  verifyAdmin,
  validationRegisterFaculties,
  registerFaculty
);
router.put(
  "/:facultyId",
  requireToken,
  verifyAdmin,
  validationUpdateFaculties,
  updateFaculty
);
router.delete("/:facultyId", requireToken, verifyAdmin, deleteFaculty);

export default router;
