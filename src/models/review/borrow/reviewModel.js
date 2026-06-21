import reviewSchema from "./reviewSchema.js";

export const createReview = (reviewObj) => {
  return reviewSchema(reviewObj).save();
};
//use filter to get reviews for specific user
// if filter is undefined, it will return entired reviews
export const getReviews = (filter) => {
  return reviewSchema.find(filter);
};

//update review table
export const updateReview = (filter, obj) => {
  return reviewSchema.findOneAndUpdate(filter, obj);
};

//delete review obj
export const deleteReview = (filter) => {
  return reviewSchema.findOneAndDelete(filter);
};
