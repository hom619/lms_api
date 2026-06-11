import { responseClient } from "../middlewares/responseClient.js";
import { EXPECTED_AVAILABLE } from "../middlewares/validations/joiConstValidationVariables.js";
import { updateBook } from "../models/book/bookModel.js";
import {
  createBorrows,
  getBorrows,
  updateBorrow,
} from "../models/Borrow/BorrowModel.js";
const BOOK_DUE_DAYS = 15;
export const insertNewBorrowController = async (req, res, next) => {
  try {
    const { _id } = req.userInfo;

    let today = new Date();
    const dueDate = today.setDate(today.getDate() + BOOK_DUE_DAYS);

    req.body = req.body.map((book) => {
      return {
        ...book,
        userId: _id,
        dueDate,
      };
    });
    const borrow = await createBorrows(req.body);
    if (borrow.length) {
      //update book table with expectedAvailable = DueDate
      borrow.map(async ({ bookId }) => {
        await updateBook({ _id: bookId, expectedAvailable: dueDate });
      });
    }
    borrow.length
      ? responseClient({
          req,
          res,
          message: "The borrow has been added Successfully!",
          payload: borrow,
        })
      : responseClient({
          req,
          res,
          message:
            "Unable to insert new borrow in the database, try again later",
          statusCode: 401,
        });
  } catch (error) {
    next(error);
  }
};

export const getBorrowsController = async (req, res, next) => {
  try {
    const { _id } = req.userInfo;
    const path = req.path;
    const isAdmin = path === "/admin";
    const borrows = isAdmin
      ? await getBorrows()
      : await getBorrows({ userId: _id });
    responseClient({
      req,
      res,
      message: "Here are the borrows list",
      payload: borrows,
    });
  } catch (error) {
    next(error);
  }
};

export const returnBorrowController = async (req, res, next) => {
  try {
    const { _id } = req.userInfo;
    const filter = {
      _id: req.body._id,
      userId: _id,
    };
    const obj = {
      isReturned: true,
      returnedDate: Date.now(),
    };
    const borrow = await updateBorrow(filter, obj);
    if (borrow._id) {
      const result = await updateBook({
        _id: borrow.bookId,
        expectedAvailable: null,
      });
      if (result._id) {
        return responseClient({
          req,
          res,
          message: "This book has been returned successfully",
        });
      }
    }
    responseClient({
      req,
      res,
      message: "Unable to return the book. Please contact the admin",
      statusCode: 400,
    });
  } catch (error) {
    next(error);
  }
};
