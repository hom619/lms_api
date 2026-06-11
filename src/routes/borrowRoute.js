import express from "express";
import {
  getBorrowsController,
  insertNewBorrowController,
  returnBorrowController,
} from "../controllers/BorrowController.js";
import {
  adminAuthMiddleware,
  userAuthMiddleware,
} from "../middlewares/authMiddleware.js";
import { newBorrowDataValidation } from "../middlewares/validations/borrowDataValidation.js";

const router = express.Router();

// Insert New Borrow
router.post(
  "/",
  userAuthMiddleware,
  newBorrowDataValidation,
  insertNewBorrowController,
);

router.get(
  "/admin",
  userAuthMiddleware,
  adminAuthMiddleware,
  getBorrowsController,
);

// return user specific borrows list only
router.get("/user", userAuthMiddleware, getBorrowsController);

router.patch("/", userAuthMiddleware, returnBorrowController);
export default router;
