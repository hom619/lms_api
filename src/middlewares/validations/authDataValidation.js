import {
  EMAIL_REQ,
  FNAME_REQ,
  LNAME_REQ,
  PASSWORD,
  PHONE,
  SESSIONID_REQ,
  TOKEN_REQ,
} from "./joiConstValidationVariables.js";
import { validateData } from "./joiValidation.js";
export const newUserDataValidation = (req, res, next) => {
  const obj = {
    fName: FNAME_REQ,
    lName: LNAME_REQ,
    email: EMAIL_REQ,
    phone: PHONE,
    password: PASSWORD,
  };
  return validateData({ req, res, next, obj });
};
export const userActivationValidation = (req, res, next) => {
  const obj = {
    sessionId: SESSIONID_REQ,
    t: TOKEN_REQ,
  };
  return validateData({ req, res, next, obj });
};
