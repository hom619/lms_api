import usersSchema from "./usersSchema.js";

//insert new user

export const createNewUser = (userObj) => {
  return usersSchema(userObj).save();
};
