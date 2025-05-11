import { Router } from "express";
import {
  deleteDocumentType,
  getDocumentTypes,
  registerDocumentType,
  updateDocumentType,
} from "../controllers/documents/documentTypesController.js";

const router = Router();

router.get("/", getDocumentTypes);
router.post("/", registerDocumentType);
router.put("/:documentId", updateDocumentType);
router.delete("/:documentId", deleteDocumentType);

export default router;
