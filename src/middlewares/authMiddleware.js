import {
  createAccessJWT,
  verifyAccessJWT,
  verifyRefreshJWT,
} from "../utils/jwt.js";
import { getOneUser, getUserByEmail } from "../models/users/usersModel.js";
import { getSession } from "../models/session/sessionModel.js";
import { responseClient } from "./responseClient.js";
export const userAuthMiddleware = async (req, res, next) => {
  //get access JWT from headers
  let message = "Unauthorized access";
  const { authorization } = req.headers;
  if (authorization) {
    const token = authorization.split(" ")[1];
    //verify the token
    const decoded = verifyAccessJWT(token);
    if (decoded?.email) {
      //check if the token exist in the session table in DB
      const tokenSession = await getSession({ token });
      if (tokenSession?._id) {
        //if all ok, get the user profile using email from DB
        const userProfile = await getUserByEmail(decoded.email);
        if (userProfile?._id && userProfile.status === "active") {
          // return the user profile
          req.userInfo = userProfile;
          return next();
        }
      }
    }
    message = decoded === "jwt expired" ? decoded : "Unauthorized access";
  }
  responseClient({ req, res, message, statusCode: 401 });
};
export const renewAccessJWTMiddleware = async (req, res, next) => {
  //get access JWT from headers
  let message = "Unauthorized access";
  const { authorization } = req.headers;
  if (authorization) {
    const token = authorization.split(" ")[1];
    //verify the token
    const decoded = verifyRefreshJWT(token);
    if (decoded?.email) {
      //check if the token exist in the session table in DB
      const user = await getOneUser({
        email: decoded.email,
        refreshJWT: token,
      });
      if (user?._id) {
        //create new accessJWT
        const token = await createAccessJWT(decoded.email);
        //return accessJWT
        return responseClient({
          req,
          res,
          message: "Here is the accessJWT",
          payload: token,
        });
      }
    }
  }
  responseClient({ req, res, message, statusCode: 401 });
};
