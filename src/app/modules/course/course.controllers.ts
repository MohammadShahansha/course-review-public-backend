import { NextFunction, Request, Response } from 'express';
import { courseValidationSchema } from './course.zod.validation';
import { courseServices } from './course.service';

const calculateWeeksDuration = (startDate: string, endDate: string): number => {
  const startTime = Date.parse(startDate);
  const endTime = Date.parse(endDate);
  const result = Math.ceil((endTime - startTime) / (7 * 24 * 3600 * 1000));
  return result;
};
const createCourse = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const zodParseData = courseValidationSchema.parse(req.body);
    const durationInWeeks = calculateWeeksDuration(
      zodParseData.startDate,
      zodParseData.endDate,
    );
    const courseWithWeeks = {
      ...zodParseData,
      durationInWeeks,
    };
    const result = await courseServices.createCourseIntoDB(courseWithWeeks);
    res.status(200).json({
      success: true,
      statusCode: 201,
      message: 'Course created successfully',
      data: result,
    });
  } catch (err) {
    next(err);
  }
};

const getAllCourse = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const result = await courseServices.getAllCourseFromDB(req.query);
    res.status(200).json({
      success: true,
      statuCode: 200,
      message: 'Courses retrieved successfully',
      data: result,
    });
  } catch (err) {
    next(err);
  }
};

// const getSingleCourse = async (
//   req: Request,
//   res: Response,
//   next: NextFunction,
// ) => {
//   try {
//     const { courseId } = req.params;
//     const result = await courseServices.getSingleCourseFromDB(courseId);
//     res.status(200).json({
//       success: true,
//       message: 'single course fetched successfully!',
//       data: result,
//     });
//   } catch (err) {
//     next(err);
//   }
// };

const updateCourse = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const { courseId } = req.params;
    const courseData = req.body;
    const result = await courseServices.updateCourseFromDB(
      courseId,
      courseData,
    );
    res.status(200).json({
      success: true,
      statusCode: 200,
      message: 'Course updated successfully',
      data: result,
    });
  } catch (err) {
    next(err);
  }
};
// const deleteCourse = async (
//   req: Request,
//   res: Response,
//   next: NextFunction,
// ) => {
//   try {
//     const { id } = req.params;
//     await courseServices.deleteCourseFromDB(id);
//     res.status(200).json({
//       success: true,
//       message: 'course deleted successfully!',
//       data: null,
//     });
//   } catch (err) {
//     next(err);
//   }
// };

//get all review and related data
const getAllReviewWithCourse = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const { courseId } = req.params;
    const result = await courseServices.getAllReviewWithCourseFromDB(courseId);
    res.status(200).json({
      success: true,
      statusCod: 200,
      message: 'Course and Reviews retrieved successfully',
      data: result,
    });
  } catch (err) {
    next(err);
  }
};

export const courseController = {
  createCourse,
  getAllCourse,
  updateCourse,
  getAllReviewWithCourse,
};
