import { Router } from "express";
import {
  getAdressById,
  updateAdress,
} from "../controllers/address/addressController.js";
import { validateIdUser } from "../middlewares/params/validateIdUser.js";
import { validationUpdateAddress } from "../middlewares/address/validatedUpdateAddress.js";

const router = Router();

router.get("/:idUser", validateIdUser, getAdressById);
router.put("/:idUser", validateIdUser, validationUpdateAddress, updateAdress);

export default router;
