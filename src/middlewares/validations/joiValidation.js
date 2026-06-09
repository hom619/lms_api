import Joi from "joi";
import { responseClient } from "../responseClient.js";
import { deleteUploadedFiles } from "../../utils/fileUtils.js";
export const validateData = ({ req, res, next, obj }) => {
  //create schema or rules
  const schema = Array.isArray(req.body)
    ? Joi.array().items(obj).min(1).required()
    : Joi.object(obj);
  // pass your data, req.body, to the schema
  const { error } = schema.validate(req.body);
  if (error) {
    if (req.file || Array.isArray(req.files)) {
      // proceed for deleting the uploaded file
      deleteUploadedFiles(req);
    }
    return responseClient({
      req,
      res,
      message: error.message,
      statusCode: 400,
    });
  }
  next();
};
