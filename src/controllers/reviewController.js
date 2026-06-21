import { responseClient } from "../middlewares/responseClient.js";
import { updateBorrow } from "../models/Borrow/BorrowModel.js";
import { createReview } from "../models/review/borrow/reviewModel.js";
export const insertNewReviewController = async (req, res, next) => {
  try {
    const { _id, fName, lName } = req.userInfo;
    const { borrowId } = req.body;
    const obj = {
      userId: _id,
      username: `${fName} ${lName}`,
      ...req.body,
    };
    const result = await createReview(obj);
    if (result?._id) {
      const reviewId = result._id;
      const updatedResult = await updateBorrow({ _id: borrowId }, { reviewId });
      if (updatedResult?._id) {
        return responseClient({
          req,
          res,
          message: "Your review has been received successfully!",
        });
      }
    }
    responseClient({
      req,
      res,
      message: "Something went wrong. Please contact admin.",
      statusCode: 401,
    });
  } catch (error) {
    next(error);
  }
};
