import { Router } from "express";
import {
  deleteDocumentType,
  getDocumentTypes,
  registerDocumentType,
  updateDocumentType,
} from "../controllers/documents/documentTypesController.js";
import { validateRegisterDocumentType } from "../middlewares/documents/validatedRegisterDocumentType.js";
import { validateUpdateDocumentType } from "../middlewares/documents/validatedUpdateDocumentType.js";

const router = Router();

router.get("/", getDocumentTypes);
router.post("/", validateRegisterDocumentType, registerDocumentType);
router.put("/:documentId", validateUpdateDocumentType, updateDocumentType);
router.delete("/:documentId", deleteDocumentType);

export default router;
