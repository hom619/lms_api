import bookSchema from "./bookSchema.js";

//insert new book

export const createNewBook = (bookObj) => {
  return bookSchema(bookObj).save();
};
