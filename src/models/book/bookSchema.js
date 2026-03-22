import mongoose from "mongoose";
const bookSchema = new mongoose.Schema(
  {
    status: {
      type: String,
      default: "inactive",
    },
    title: {
      type: String,
      required: true,
    },
    year: {
      type: Number,
      required: true,
    },
    author: {
      type: String,
      required: true,
    },
    status: {
      type: String,
      required: true,
    },
    imgUrl: {
      type: String,
      required: true,
    },
    isbn: {
      type: Number,
      unique: true,
      index: 1,
      required: true,
    },
    genre: {
      type: String,
      required: true,
    },
    available: {
      type: Boolean,
      default: true,
    },
    averageRating: {
      type: Number,
    },
    addedBy: {
      name: {
        type: String,
      },
      adminId: {
        type: mongoose.Types.ObjectId,
      },
    },
    lastUpdatedBy: {
      name: {
        type: String,
      },
      adminId: {
        type: mongoose.Types.ObjectId,
      },
    },
  },
  {
    timestamps: true,
  },
);
export default mongoose.model("book", bookSchema);
