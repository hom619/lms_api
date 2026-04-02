import bookSchema from "./bookSchema.js";

//insert new book

export const createNewBook = (bookObj) => {
  return bookSchema(bookObj).save();
};
export const getAllPublicBooks = () => {
  return bookSchema.find({ status: "active" });
};
export const getAllBooks = () => {
  return bookSchema.find();
};
