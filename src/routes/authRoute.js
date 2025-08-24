import express from "express";
import { activateUser, insertNewUser } from "../controllers/authController.js";
import {
  newUserDataValidation,
  userActivationValidation,
} from "../middlewares/validations/authDataValidation.js";
const router = express.Router();

//User signup

router.post("/register", newUserDataValidation, insertNewUser);
router.post("/activate-user", userActivationValidation, activateUser);
export default router;
