import { TCourse } from './course.interface';
import { Course } from './course.model';

const createCourseIntoDB = async (course: TCourse) => {
  //   if (await UserModel.isUserExists(user.userId)) {
  //     throw new Error('User already exists!');
  //   }
  const result = await Course.create(course);

  return result;
};

const getAllCourseFromDB = async () => {
  const result = await Course.find();
  return result;
};

const getSingleCourseFromDB = async (id: string) => {
  const result = await Course.findById(id);
  return result;
};

const updateCourseFromDB = async (id: string, courseData: TCourse) => {
  const result = await Course.findByIdAndUpdate(id, courseData, {
    new: true,
    runValidators: true,
  });
  console.log(result);
  return result;
};

const deleteCourseFromDB = async (id: string) => {
  const result = await Course.findByIdAndDelete(id);
  return result;
};

export const courseServices = {
  createCourseIntoDB,
  getAllCourseFromDB,
  getSingleCourseFromDB,
  updateCourseFromDB,
  deleteCourseFromDB,
};
