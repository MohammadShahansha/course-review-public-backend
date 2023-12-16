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

export const courseServices = {
  createCourseIntoDB,
  getAllCourseFromDB,
  getSingleCourseFromDB,
  updateCourseFromDB,
  deleteCourseFromDB,
};
