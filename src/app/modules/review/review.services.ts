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
const getAllReviewWithCourseFromDB = async (id: string) => {
  const result = await Review.aggregate([
    {
      $match: { id },
    },
    {
      $lookup: {
        from: 'courses',
        localField: 'courseId',
        foreignField: '_id',
        as: 'data',
      },
    },
  ]);
  console.log(result);
  return result;
};

export const reviewServices = {
  createReviewIntoDB,
  getAllReviewFromDB,
  getAllReviewWithCourseFromDB,
};
