import express from "express";
import {
  activateUser,
  generateOTP,
  insertNewUser,
  loginUser,
  logoutUser,
} from "../controllers/authController.js";
import {
  renewAccessJWTMiddleware,
  userAuthMiddleware,
} from "../middlewares/authMiddleware.js";
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
router.get("/renew-jwt", renewAccessJWTMiddleware);
router.get("/logout", userAuthMiddleware, logoutUser);
router.get("/otp", generateOTP);
export default router;
