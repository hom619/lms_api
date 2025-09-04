import express from "express";
import { responseClient } from "../middlewares/responseClient.js";
import { userAuthMiddleware } from "../middlewares/authMiddleware.js";
const router = express.Router();
router.get("/profile", userAuthMiddleware, async (req, res) => {
  const user = req.userInfo;
  user.password = undefined;
  user.__v = undefined;
  user.refreshJWT = undefined;
  return responseClient({ req, res, message: "User profile", payload: user });
});

export default router;
