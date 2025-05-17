import { Router } from "express";
import { getDependencies } from "../controllers/dependencies/dependenciesController.js";
import { requireToken } from "../middlewares/auth/requireToken.js";
import { verifyAllUsers } from "../middlewares/auth/verifyUser.js";

const router = Router();

router.get("/", requireToken, verifyAllUsers, getDependencies);

export default router;
