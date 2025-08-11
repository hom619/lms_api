import { responseClient } from "../middlewares/responseClient.js";
import { createNewSession } from "../models/session/sessionModel.js";
import { createNewUser } from "../models/users/usersModel.js";
import { sendActivationEmail } from "../services/emailServices.js";
import { hashPassword } from "../utils/bcrypt.js";
import { v4 as uuidv4 } from "uuid";

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
        const url = `${process.env.ROOT_URL}/activate-user?id=${session._id}&&t=${session.token}`;
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
