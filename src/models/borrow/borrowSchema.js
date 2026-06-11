import mongoose, { mongo } from "mongoose";

const borrowSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    bookId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Book",
    },
    bookTitle: {
      type: String,
      required: true,
    },
    bookSlug: {
      type: String,
      required: true,
    },
    thumbnail: {
      type: String,
      required: true,
    },
    reviewId: {
      type: mongoose.Schema.Types.ObjectId,
      default: null,
      ref: "Review",
    },

    isReturned: {
      type: Boolean,
      default: false,
    },
    dueDate: {
      type: Date,
      required: true,
    },

    returnedDate: {
      type: Date,
      required: null,
    },
  },
  {
    timestamps: true,
  },
);
export default mongoose.model("Borrow", borrowSchema);
