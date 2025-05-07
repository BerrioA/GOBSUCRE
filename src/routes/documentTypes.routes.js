import { Router } from "express";
import { getDocumentTypes } from "../controllers/documents/documentTypesController.js";

const router = Router();

router.get("/", getDocumentTypes);

export default router;
