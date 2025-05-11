import { Router } from "express";
import { registerFaculty } from "../controllers/faculties/facultiesController.js";

const router = Router();

router.post("/", registerFaculty);

export default router;
