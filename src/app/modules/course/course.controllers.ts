import { NextFunction, Request, Response } from 'express';
import { courseValidationSchema } from './course.zod.validation';
import { courseServices } from './course.service';

const createCourse = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const zodParseData = courseValidationSchema.parse(req.body);
    const result = await courseServices.createCourseIntoDB(zodParseData);
    res.status(200).json({
      success: true,
      message: 'course created successfully!',
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
      message: 'course fetched successfully!',
      data: result,
    });
  } catch (err) {
    next(err);
  }
};

const getSingleCourse = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const { courseId } = req.params;
    const result = await courseServices.getSingleCourseFromDB(courseId);
    res.status(200).json({
      success: true,
      message: 'single course fetched successfully!',
      data: result,
    });
  } catch (err) {
    next(err);
  }
};

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
      message: 'course updated successfully!',
      data: result,
    });
  } catch (err) {
    next(err);
  }
};
const deleteCourse = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const { id } = req.params;
    await courseServices.deleteCourseFromDB(id);
    res.status(200).json({
      success: true,
      message: 'course deleted successfully!',
      data: null,
    });
  } catch (err) {
    next(err);
  }
};

//get all review and related data
const getAllReviewWithCourse = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const { courseId } = req.params;
    // console.log('course:', courseId, req.body);
    const result = await courseServices.getAllReviewWithCourseFromDB(courseId);
    res.status(200).json({
      success: true,
      message: 'get course and review successfully!',
      data: result,
    });
  } catch (err) {
    next(err);
  }
};

export const courseController = {
  createCourse,
  getAllCourse,
  getSingleCourse,
  updateCourse,
  deleteCourse,
  getAllReviewWithCourse,
};
