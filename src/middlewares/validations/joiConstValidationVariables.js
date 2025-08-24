import Joi from "joi";

export const FNAME = Joi.string().min(3);
export const FNAME_REQ = FNAME.required();
export const LNAME = Joi.string().min(3);
export const LNAME_REQ = LNAME.required();
export const EMAIL = Joi.string().email({ minDomainSegments: 2 });
export const EMAIL_REQ = EMAIL.required();
export const PHONE = Joi.number();
export const PASSWORD = Joi.string().required();
export const SESSIONID = Joi.string().min(10).max(30);
export const SESSIONID_REQ = SESSIONID.required();
export const TOKEN = Joi.string().min(10);
export const TOKEN_REQ = TOKEN.required();
