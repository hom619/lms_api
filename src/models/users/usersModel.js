import usersSchema from "./usersSchema.js";

//insert new user

export const createNewUser = (userObj) => {
  return usersSchema(userObj).save();
};

export const updateUser = (filter, update) => {
  return usersSchema.findOneAndUpdate(filter, update, { new: true });
};
export const getUserByEmail = (email) => {
  return usersSchema.findOne({ email });
};
export const getOneUser = (filter) => {
  return usersSchema.findOne(filter);
};
