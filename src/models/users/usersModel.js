import usersSchema from "./usersSchema.js";

//insert new user

export const createNewUser = (userObj) => {
  return usersSchema(userObj).save();
};

export const updateUser = (filter, update) => {
  return usersSchema.findOneAndUpdate(filter, update, { new: true });
};
