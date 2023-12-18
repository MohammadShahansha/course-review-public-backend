import { Course } from '../course/course.model';
import { TReview } from './review.interface';
import { Review } from './review.model';

const createReviewIntoDB = async (review: TReview) => {
  const result = await Review.create(review);

  return result;
};

const getAllReviewFromDB = async () => {
  const result = await Review.find();
  return result;
};
// const getAllReviewWithCourseFromDB = async (id: string) => {
//   const course = await Course.findById(id);
//   const reviews = await Review.findById(id);
//   const result = {
//     course,
//     reviews,
//   };
//   return result;
// };

export const reviewServices = {
  createReviewIntoDB,
  getAllReviewFromDB,
  // getAllReviewWithCourseFromDB,
};
