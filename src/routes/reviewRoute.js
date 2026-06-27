import express from "express";
import {
  adminAuthMiddleware,
  userAuthMiddleware,
} from "../middlewares/authMiddleware.js";
import {
  getAllReviewsController,
  insertNewReviewController,
  updateReviewController,
} from "../controllers/reviewController.js";
import { reviewDataValidation } from "../middlewares/validations/reviewDataValidation.js";

const router = express.Router();

// Insert New review
router.post(
  "/",
  userAuthMiddleware,
  reviewDataValidation,
  insertNewReviewController,
);

// return only approved reviews for public users
router.get("/", getAllReviewsController);

// return all reviews for admin only
router.get("/admin", userAuthMiddleware, getAllReviewsController);

//update review status for specific user
router.patch("/user", userAuthMiddleware, getAllReviewsController);

//update review status for admin
router.patch(
  "/admin",
  userAuthMiddleware,
  adminAuthMiddleware,
  updateReviewController,
);

export default router;
