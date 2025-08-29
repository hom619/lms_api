import {
  EMAIL_REQ,
  FNAME_REQ,
  LNAME_REQ,
  PASSWORD,
  PASSWORD_REQ,
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
    password: PASSWORD_REQ,
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
export const loginDataValidation = (req, res, next) => {
  const obj = {
    email: EMAIL_REQ,
    password: PASSWORD_REQ,
  };
  return validateData({ req, res, next, obj });
};
