import { responseClient } from "../middlewares/responseClient.js";
import {
  createNewBook,
  getAllPublicBooks,
  getAllBooks,
  updateBook,
  deleteBook,
} from "../models/book/bookModel.js";
import slugify from "slugify";
export const insertNewBook = async (req, res, next) => {
  try {
    const { fName, _id } = req.userInfo;
    const obj = {
      ...req.body,
      slug: slugify(req.body.title, { lower: true }),
      addedBy: {
        name: fName,
        adminId: _id,
      },
      lastUpdatedBy: {
        name: fName,
        adminId: _id,
      },
    };
    const book = await createNewBook(obj);
    book._id
      ? responseClient({
          req,
          res,
          message: "The book details have been added successfully",
        })
      : responseClient({
          req,
          res,
          message: "Unable to add book details. Please try agin",
          statusCode: 401,
        });
  } catch (error) {
    if (error.message.includes("E11000 duplicate key")) {
      responseClient({
        req,
        res,
        message: "Duplicate data found " + JSON.stringify(error.keyValue),
        statusCode: 400,
      });
    }
    next(error);
  }
};
export const updateBookController = async (req, res, next) => {
  try {
    const { fName, _id } = req.userInfo;
    const obj = {
      ...req.body,
      slug: slugify(req.body.title, { lower: true }),
      lastUpdatedBy: {
        name: fName,
        adminId: _id,
      },
    };
    const book = await updateBook(obj);
    book._id
      ? responseClient({
          req,
          res,
          message: "The book details have been updated successfully",
        })
      : responseClient({
          req,
          res,
          message: "Unable to update book details. Please try agin",
          statusCode: 400,
        });
  } catch (error) {
    next(error);
  }
};
export const deleteBookController = async (req, res, next) => {
  try {
    const { _id } = req.params;
    const book = await deleteBook(_id);
    book?._id
      ? responseClient({
          req,
          res,
          message: "The book has been deleted successfully",
        })
      : responseClient({
          req,
          res,
          message: "Unable to delete book. Please try agin",
          statusCode: 400,
        });
  } catch (error) {
    next(error);
  }
};
export const getAllPublicBooksController = async (req, res, next) => {
  try {
    const payload = await getAllPublicBooks();
    responseClient({
      req,
      res,
      message: "Here are the list of public books",
      payload,
    });
  } catch (error) {
    next(error);
  }
};
export const getAllBooksController = async (req, res, next) => {
  try {
    const payload = await getAllBooks();
    responseClient({
      req,
      res,
      message: "Here are the list of all books",
      payload,
    });
  } catch (error) {
    next(error);
  }
};
