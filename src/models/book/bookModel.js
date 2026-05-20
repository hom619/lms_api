import bookSchema from "./bookSchema.js";

//insert new book

export const createNewBook = (bookObj) => {
  return bookSchema(bookObj).save();
};
export const getAllPublicBooks = () => {
  return bookSchema.find({ status: "Active" });
};
export const getAllBooks = () => {
  return bookSchema.find();
};
//get single book, filter = {slug, status: "Active"}
export const getSingleBook = (filter) => {
  return bookSchema.findOne(filter);
};
export const updateBook = ({ _id, ...rest }) => {
  return bookSchema.findByIdAndUpdate(_id, rest);
};
export const deleteBook = (_id) => {
  return bookSchema.findByIdAndDelete(_id);
};
