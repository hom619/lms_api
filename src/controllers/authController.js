import { createNewUser } from "../models/users/usersModel.js";
import { hashPassword } from "../utils/bcrypt.js";

export const insertNewUser = async (req, res, next) => {
  try {
    const { password } = req.body;
    req.body.password = hashPassword(password);
    const user = await createNewUser(req.body);
    if (user?._id) {
      res.json({
        status: "success",
        message: "TODO",
      });
    }
    res.json({
      status: "error",
      message: "Unable to create account. Please try again later",
    });
  } catch (error) {
    next(error);
  }
};
