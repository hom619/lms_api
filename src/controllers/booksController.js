import { responseClient } from "../middlewares/responseClient.js";
import { createNewBook } from "../models/book/bookModel.js";

export const insertNewBook = async (req, res, next) => {
  try {
    const { fName, _id } = req.userInfo;
    const obj = {
      ...req.body,

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
    next(error);
  }
};
