import { SHORT_STR_REQ } from "./joiConstValidationVariables.js";
import { validateData } from "./joiValidation.js";
import Joi from "joi";

export const newBorrowDataValidation = (req, res, next) => {
  const obj = {
    bookId: SHORT_STR_REQ,
    bookTitle: SHORT_STR_REQ,
    thumbnail: SHORT_STR_REQ,
  };
  return validateData({ req, res, next, obj });
};
