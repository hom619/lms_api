import jwt from "jsonwebtoken";
import { createNewSession } from "../models/session/sessionModel.js";
import { updateUser } from "../models/users/usersModel.js";

//generate jwt token
export const createAccessJWT = async (email) => {
  // create token
  const token = jwt.sign({ email }, process.env.ACCESSJWT_SECRET, {
    expiresIn: "15m",
  });
  // store in db
  const obj = {
    token,
    association: email,
    expire: new Date(Date.now() + 15 * 60 * 1000), //15 minutes
  };
  const newSession = await createNewSession(obj);
  return newSession?._id ? token : null;
};
//decode jwt token
//generate refresh token
export const createRefreshJWT = async (email) => {
  // create token
  const refreshJWT = jwt.sign({ email }, process.env.REFRESHJWT_SECRET, {
    expiresIn: "30d",
  });
  console.log(refreshJWT);
  // store in db
  const user = await updateUser({ email }, { refreshJWT });
  console.log(user);
  return user?._id ? refreshJWT : null;
};
//decode refresh token
export const getJWTs = async (email) => {
  return {
    accessJWT: await createAccessJWT(email),
    refreshJWT: await createRefreshJWT(email),
  };
};
