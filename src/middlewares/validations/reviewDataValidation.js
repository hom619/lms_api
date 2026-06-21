import {
  LONG_STR_REQ,
  RATING_REQ,
  SHORT_STR_REQ,
} from "./joiConstValidationVariables.js";
import { validateData } from "./joiValidation.js";
import Joi from "joi";

export const reviewDataValidation = (req, res, next) => {
  const obj = {
    bookId: SHORT_STR_REQ,
    borrowId: SHORT_STR_REQ,
    title: SHORT_STR_REQ,
    rating: RATING_REQ,
    reviewMessage: LONG_STR_REQ,
  };
  return validateData({ req, res, next, obj });
};
