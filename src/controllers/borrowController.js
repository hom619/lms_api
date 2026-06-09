import { responseClient } from "../middlewares/responseClient.js";
import { createBorrows, getBorrows } from "../models/Borrow/BorrowModel.js";
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
