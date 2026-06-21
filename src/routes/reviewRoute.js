import express from "express";
import {
  adminAuthMiddleware,
  userAuthMiddleware,
} from "../middlewares/authMiddleware.js";
import { insertNewReviewController } from "../controllers/reviewController.js";
import { reviewDataValidation } from "../middlewares/validations/reviewDataValidation.js";

const router = express.Router();

// Insert New review
router.post(
  "/",
  userAuthMiddleware,
  reviewDataValidation,
  insertNewReviewController,
);

export default router;
