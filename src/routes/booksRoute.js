import express from "express";
import {
  deleteBookController,
  getAllBooksController,
  getAllPublicBooksController,
  getSingleBookController,
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
import { upload } from "../utils/multer.js";

const router = express.Router();

//Get all public books which are active
router.get("/", getAllPublicBooksController);

//Get single book using slug
router.get("/public/:slug", getSingleBookController);

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
  upload.single("image"),
  // upload.array("image", 2),
  newBookDataValidation,

  insertNewBook,
);
// Edit Book
router.put(
  "/",
  userAuthMiddleware,
  adminAuthMiddleware,
  upload.array("images", 2),
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
