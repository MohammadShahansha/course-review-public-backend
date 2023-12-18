/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable no-undef */
// import { Query } from 'mongoose';
import { TCourse } from './course.interface';
import { Course } from './course.model';
import filter from '../../queryHelpers/filterQuery';
import sort from '../../queryHelpers/sortQuery';
import paginate from '../../queryHelpers/paginateQuery';
import field from '../../queryHelpers/fieldQuery';
import { Review } from '../review/review.model';

const createCourseIntoDB = async (course: TCourse) => {
  //   if (await UserModel.isUserExists(user.userId)) {
  //     throw new Error('User already exists!');
  //   }
  const result = await Course.create(course);
  return result;
};

const getAllCourseFromDB = async (query: any) => {
  // console.log(query);
  // if (query.tags) {
  //   query = { tags: 'tags.name' };
  // }
  const filterQuery = filter(Course.find(), query);
  const sortQuery = sort(filterQuery, query);
  const paginateQuery = paginate(sortQuery, query);
  const selectedFieldQuery = field(paginateQuery, query);

  const result = await selectedFieldQuery;
  return result;
};

const getSingleCourseFromDB = async (id: string) => {
  const result = await Course.findById(id);
  return result;
};

const updateCourseFromDB = async (id: string, courseData: Partial<TCourse>) => {
  const { tags, details, ...remainingCourseData } = courseData;
  const modifiedUpdateData: Record<string, unknown> = {
    ...remainingCourseData,
  };

  if (tags && tags.length) {
    for (const [key, value] of Object.entries(tags)) {
      modifiedUpdateData[`tags.${key}`] = value;
    }
  }
  if (details && Object.keys(details).length) {
    for (const [key, value] of Object.entries(details)) {
      modifiedUpdateData[`details.${key}`] = value;
    }
  }

  const result = await Course.findByIdAndUpdate(id, modifiedUpdateData, {
    new: true,
    runValidators: true,
  });
  return result;
};

const deleteCourseFromDB = async (id: string) => {
  const result = await Course.findByIdAndDelete(id);
  return result;
};

//to get all review and services
const getAllReviewWithCourseFromDB = async (id: string) => {
  const course = await Course.findById(id);
  const reviews = await Review.find({ courseId: id });
  const result = {
    course,
    reviews,
  };
  return result;
};

export const courseServices = {
  createCourseIntoDB,
  getAllCourseFromDB,
  getSingleCourseFromDB,
  updateCourseFromDB,
  deleteCourseFromDB,
  getAllReviewWithCourseFromDB,
};
