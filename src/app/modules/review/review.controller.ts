import { NextFunction, Request, Response } from 'express';
import { reviewValidationSchema } from './review.zod.validation';
import { reviewServices } from './review.services';

const createReview = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const zodParseData = reviewValidationSchema.parse(req.body);
    const result = await reviewServices.createReviewIntoDB(zodParseData);
    res.status(200).json({
      success: true,
      message: 'review created successfully!',
      data: result,
    });
  } catch (err) {
    next(err);
  }
};

const getAllReview = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const result = await reviewServices.getAllReviewFromDB();
    res.status(200).json({
      success: true,
      message: 'review fetched successfully!',
      data: result,
    });
  } catch (err) {
    next(err);
  }
};
//find best course-----------------
const getBestCourse = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const result = await reviewServices.getBestCourseFromDB();
    res.status(200).json({
      success: true,
      message: 'get best course successfully!',
      data: result,
    });
  } catch (err) {
    next(err);
  }
};

export const reviewController = {
  createReview,
  getAllReview,
  getBestCourse,
};
