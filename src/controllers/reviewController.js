import { responseClient } from "../middlewares/responseClient.js";
import { updateBorrow } from "../models/Borrow/BorrowModel.js";
import {
  createReview,
  getReviews,
  updateReview,
} from "../models/review/borrow/reviewModel.js";
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

export const getAllReviewsController = async (req, res, next) => {
  try {
    const filter = {};
    if (req?.userInfo?.role !== "admin") {
      filter.isApproved = true;
    }
    const payload = await getReviews(filter);
    responseClient({
      req,
      res,
      message: "Here are the list of reviews",
      payload,
    });
  } catch (error) {
    next(error);
  }
};

export const updateReviewController = async (req, res, next) => {
  try {
    const { _id, isApproved } = req.body;
    const result = await updateReview({ _id, isApproved });
    result._id
      ? responseClient({
          req,
          res,
          message: "The review has been updated successfully",
        })
      : responseClient({
          req,
          res,
          message: "Unable to update the review. Please contact admin",
          statusCode: 400,
        });
  } catch (error) {}
};
