import express from "express";
import {
  deleteBookController,
  getAllBooksController,
  getAllPublicBooksController,
  insertNewBook,
  updateBookController,
} from "../controllers/booksController.js";
import {
  adminAuthMiddleware,
  userAuthMiddleware,
} from "../middlewares/authMiddleware.js";
import {
  newBookDataValidation,
  updateBookDataValidation,
} from "../middlewares/validations/bookDataValidation.js";
import { getAllBooks } from "../models/book/bookModel.js";
const router = express.Router();
//Get all public books which are active
router.get("/", getAllPublicBooksController);

//Get all the books in the database i.e from admin access
router.get(
  "/admin",
  userAuthMiddleware,
  adminAuthMiddleware,
  getAllBooksController,
);

// Insert New Book
router.post(
  "/",
  userAuthMiddleware,
  adminAuthMiddleware,
  newBookDataValidation,
  insertNewBook,
);
// Edit Book
router.put(
  "/",
  userAuthMiddleware,
  adminAuthMiddleware,
  updateBookDataValidation,
  updateBookController,
);
// Delete Book
router.delete(
  "/:_id",
  userAuthMiddleware,
  adminAuthMiddleware,
  deleteBookController,
);
export default router;
