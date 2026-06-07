import borrowSchema from "./borrowSchema.js";

//insert new borrow

// export const createNewBorrow = (borrowObj) => {
//   return borrowSchema(borrowObj).save();
// };
export const createBorrows = (borrowArg) => {
  return borrowSchema.insertMany(borrowArg);
};
//use filter to get borrows for specific user
export const getBorrows = (filter) => {
  return borrowSchema.find(filter);
};
