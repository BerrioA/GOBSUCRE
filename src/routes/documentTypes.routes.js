import { Router } from "express";
import {
  deleteDocumentType,
  getDocumentTypes,
  registerDocumentType,
  updateDocumentType,
} from "../controllers/documents/documentTypesController.js";
import { validateExistingDocumentType } from "../middlewares/Document-types/validatedExistingDocumentType.js";
import {
  validationRegisterDocumentType,
  validationUpdateDocumentType,
} from "../middlewares/Document-types/validatedDocumentType.js";
import { requireToken } from "../middlewares/auth/requireToken.js";
import { verifyAdmin, verifyAllUsers } from "../middlewares/auth/verifyUser.js";

const router = Router();

router.get("/", requireToken, verifyAllUsers, getDocumentTypes);
router.post(
  "/",
  requireToken,
  verifyAdmin,
  validateExistingDocumentType,
  validationRegisterDocumentType,
  registerDocumentType
);
router.put(
  "/:documentId",
  requireToken,
  verifyAdmin,
  validationUpdateDocumentType,
  updateDocumentType
);
router.delete("/:documentId", requireToken, verifyAdmin, deleteDocumentType);

export default router;
