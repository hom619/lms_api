import reviewSchema from "./reviewSchema.js";

export const createReview = (reviewObj) => {
  return reviewSchema(reviewObj).save();
};
//use filter to get reviews for specific user
// if filter is undefined, it will return entired reviews
export const getReviews = (filter) => {
  return reviewSchema
    .find(filter)
    .populate({
      path: "bookId", // populate is used to join tables and path which is bookId is used as foreign key
      select: "title slug imgUrl",
    })
    .sort({ updatedAt: -1 }); // -1 sorts in descending order and 1 sorts in ascending order
};

//update review table
export const updateReview = ({ _id, ...rest }) => {
  return reviewSchema.findByIdAndUpdate(_id, rest);
};

//delete review obj
export const deleteReview = (filter) => {
  return reviewSchema.findOneAndDelete(filter);
};
