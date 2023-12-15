import { Request, Response } from 'express';
import { courseValidationSchema } from './course.zod.validation';
import { courseServices } from './course.service';

const createCourse = async (req: Request, res: Response) => {
  try {
    const zodParseData = courseValidationSchema.parse(req.body);
    const result = await courseServices.createCourseIntoDB(zodParseData);
    res.status(200).json({
      success: true,
      message: 'course created successfully!',
      data: result,
    });
  } catch (err: any) {
    res.status(500).json({
      success: false,
      message: err.message || 'Something went wrong',
      error: err,
    });
  }
};

const getAllCourse = async (req: Request, res: Response) => {
  try {
    const result = await courseServices.getAllCourseFromDB();
    res.status(200).json({
      success: true,
      message: 'course fetched successfully!',
      data: result,
    });
  } catch (err) {
    console.log(err);
  }
};

const getSingleCourse = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const result = await courseServices.getSingleCourseFromDB(id);
    res.status(200).json({
      success: true,
      message: 'single course fetched successfully!',
      data: result,
    });
  } catch (err: any) {
    res.status(404).json({
      success: false,
      message: err.message || 'course not found',
      error: {
        code: 404,
        description: 'course not found!',
      },
    });
  }
};

const updateCourse = async (req: Request, res: Response) => {
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
  } catch (err: any) {
    res.status(404).json({
      success: false,
      message: err.message || 'course not found',
      error: {
        code: 404,
        description: 'course not found!',
      },
    });
  }
};
const deleteCourse = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    await courseServices.deleteCourseFromDB(id);
    res.status(200).json({
      success: true,
      message: 'course deleted successfully!',
      data: null,
    });
  } catch (err: any) {
    res.status(404).json({
      success: false,
      message: err.message || 'course not found',
      error: {
        code: 404,
        description: 'course not found!',
      },
    });
  }
};

export const courseController = {
  createCourse,
  getAllCourse,
  getSingleCourse,
  updateCourse,
  deleteCourse,
};
