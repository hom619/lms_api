import Joi from "joi";
import { responseClient } from "../responseClient.js";
export const validateData = ({ req, res, next, obj }) => {
  // "fName": "Hom",
  //     "lName": "Shrestha",
  //     "email":"homug@gmail.com",
  //     "phone": "0545343235",
  //     "password": "A12#roskfkf"
  //create schema or rules
  const schema = Joi.object(obj);
  // pass your data, req.body, to the schema
  const { error } = schema.validate(req.body);
  if (error) {
    return responseClient({
      req,
      res,
      message: error.message,
      statusCode: 400,
    });
  }
  next();
};
