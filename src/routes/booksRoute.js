import express from "express";
import {
  getAllBooksController,
  getAllPublicBooksController,
  insertNewBook,
} from "../controllers/booksController.js";
import {
  adminAuthMiddleware,
  userAuthMiddleware,
} from "../middlewares/authMiddleware.js";
import { newBookDataValidation } from "../middlewares/validations/bookDataValidation.js";
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

export default router;
