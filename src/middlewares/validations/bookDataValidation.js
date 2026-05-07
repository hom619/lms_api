import {
  _ID_REQ,
  EXPECTED_AVAILABLE,
  ISBN_REQ,
  LONG_STR_REQ,
  SHORT_STR_REQ,
  STATUS_REQ,
  YEAR_REQ,
  STR_ARRAY,
  STR_ARRAY_REQ,
} from "./joiConstValidationVariables.js";
import { validateData } from "./joiValidation.js";
import Joi from "joi";

export const newBookDataValidation = (req, res, next) => {
  const obj = {
    title: SHORT_STR_REQ,
    year: YEAR_REQ,
    author: SHORT_STR_REQ,
    isbn: ISBN_REQ,
    genre: SHORT_STR_REQ,
    description: LONG_STR_REQ,
  };
  return validateData({ req, res, next, obj });
};
export const updateBookDataValidation = (req, res, next) => {
  req.body.expectedAvailable =
    req.body.expectedAvailable === "null" ? null : req.body.expectedAvailable;
  const obj = {
    status: STATUS_REQ,
    _id: _ID_REQ,
    title: SHORT_STR_REQ,
    year: YEAR_REQ,
    author: SHORT_STR_REQ,
    imgUrl: LONG_STR_REQ,
    isbn: ISBN_REQ,
    genre: SHORT_STR_REQ,
    description: LONG_STR_REQ,
    expectedAvailable: EXPECTED_AVAILABLE,
    imageList: LONG_STR_REQ.allow(""),
    imageToDelete: Joi.alternatives().try(STR_ARRAY, Joi.string()),
  };
  return validateData({ req, res, next, obj });
};
