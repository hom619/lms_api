import express from "express";
import {
  activateUser,
  insertNewUser,
  loginUser,
} from "../controllers/authController.js";
import {
  newUserDataValidation,
  userActivationValidation,
  loginDataValidation,
} from "../middlewares/validations/authDataValidation.js";
const router = express.Router();

//User signup

router.post("/register", newUserDataValidation, insertNewUser);
router.post("/activate-user", userActivationValidation, activateUser);
router.post("/login", loginDataValidation, loginUser);
export default router;
