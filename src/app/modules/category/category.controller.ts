import { NextFunction, Request, Response } from 'express';
import { categoryValidationSchema } from './category.zod.validation';
import { categoryServices } from './category.services';

const createCategory = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const zodParseData = categoryValidationSchema.parse(req.body);
    const result = await categoryServices.createCategoryIntoDB(zodParseData);
    res.status(201).json({
      success: true,
      statusCode: 201,
      message: 'category created successfully!',
      data: result,
    });
  } catch (err) {
    next(err);
  }
};

const getAllCategory = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const result = await categoryServices.getAllCategoryFromDB();
    res.status(200).json({
      success: true,
      message: 'categories fetched successfully!',
      data: result,
    });
  } catch (err) {
    next(err);
  }
};

const getSingleCategory = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const { id } = req.params;
    const result = await categoryServices.getSingleCategoryFromDB(id);
    res.status(200).json({
      success: true,
      message: 'single category fetched successfully!',
      data: result,
    });
  } catch (err) {
    next(err);
  }
};

const updateCategory = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const { courseId } = req.params;
    const courseData = req.body;
    const result = await categoryServices.updateCategoryFromDB(
      courseId,
      courseData,
    );
    res.status(200).json({
      success: true,
      message: 'category updated successfully!',
      data: result,
    });
  } catch (err) {
    next(err);
  }
};
const deleteCategory = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const { id } = req.params;
    await categoryServices.deleteCategoryFromDB(id);
    res.status(200).json({
      success: true,
      message: 'category deleted successfully!',
      data: null,
    });
  } catch (err) {
    next(err);
  }
};

export const categoryController = {
  createCategory,
  getAllCategory,
  getSingleCategory,
  updateCategory,
  deleteCategory,
};
