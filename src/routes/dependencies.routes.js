import { Router } from "express";
import { getDependencies } from "../controllers/dependencies/dependenciesController.js";

const router = Router();

router.get("/", getDependencies);

export default router;
