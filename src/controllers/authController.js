import { responseClient } from "../middlewares/responseClient.js";
import {
  createNewSession,
  deleteSession,
} from "../models/session/sessionModel.js";
import {
  createNewUser,
  getUserByEmail,
  updateUser,
} from "../models/users/usersModel.js";
import {
  sendActivatedNotificationEmail,
  sendActivationEmail,
} from "../services/emailServices.js";
import { hashPassword, comparePassword } from "../utils/bcrypt.js";
import { v4 as uuidv4 } from "uuid";
import { getJWTs } from "../utils/jwt.js";

export const insertNewUser = async (req, res, next) => {
  try {
    const { password } = req.body;
    req.body.password = hashPassword(password);
    const user = await createNewUser(req.body);
    if (user?._id) {
      const session = await createNewSession({
        token: uuidv4(),
        association: user.email,
      });
      if (session?._id) {
        const url = `${process.env.ROOT_URL}/activate-user?sessionId=${session._id}&&t=${session.token}`;
        console.log(url);
        const emailId = await sendActivationEmail({
          email: user.email,
          url,
          name: user.fName,
        });
        if (emailId) {
          const message =
            "A confirmation email has been sent to your email. Please check your email.";
          return responseClient({ req, res, message });
        }
      }
    }
    throw new Error("Unable to create account. Please try again later");
  } catch (error) {
    if (error.message.includes("E11000 duplicate key error collection")) {
      error.message = "Email already exists. Please try different email.";
      error.status = 400;
    }
    next(error);
  }
};
export const activateUser = async (req, res, next) => {
  try {
    const { sessionId, t } = req.body;
    const session = await deleteSession({
      _id: sessionId,
      token: t,
    });
    if (session?._id) {
      const user = await updateUser(
        { email: session.association },
        { status: "active" }
      );
      if (user?._id) {
        sendActivatedNotificationEmail({ email: user.email, name: user.fName });
        const message = "Your account has been activated. You may login now!";
        return responseClient({ req, res, message });
      }
    }
    const message = "Invalid link or token expired";
    const statusCode = 400;
    responseClient({ req, res, message, statusCode });
  } catch (error) {
    next(error);
  }
};
export const loginUser = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    // get user by email
    const user = await getUserByEmail(email);
    console.log(user);
    if (user?._id) {
      // compare password
      const isPasswordValid = comparePassword(password, user.password);
      if (isPasswordValid) {
        // create jwt token
        const jwts = await getJWTs(email);
        // respond to client
        return responseClient({
          req,
          res,
          message: "Login successful",
          payload: jwts,
        });
      }
    }

    const message = "Invalid login credentials";
    const statusCode = 401;
    responseClient({ req, res, message, statusCode });
  } catch (error) {}
};
