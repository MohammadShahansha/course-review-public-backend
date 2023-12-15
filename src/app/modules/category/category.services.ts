import { TCategory } from './category.interface';
import { Category } from './category.model';

const createCategoryIntoDB = async (category: TCategory) => {
  //   if (await UserModel.isUserExists(user.userId)) {
  //     throw new Error('User already exists!');
  //   }
  const result = await Category.create(category);
  return result;
};

const getAllCategoryFromDB = async () => {
  const result = await Category.find();
  return result;
};

const getSingleCategoryFromDB = async (id: string) => {
  const result = await Category.findById(id);
  return result;
};

const updateCategoryFromDB = async (id: string, CategoryData: TCategory) => {
  const result = await Category.findByIdAndUpdate(id, CategoryData, {
    new: true,
    runValidators: true,
  });
  return result;
};

const deleteCategoryFromDB = async (id: string) => {
  const result = await Category.findByIdAndDelete(id);
  return result;
};

export const categoryServices = {
  createCategoryIntoDB,
  getAllCategoryFromDB,
  getSingleCategoryFromDB,
  deleteCategoryFromDB,
  updateCategoryFromDB,
};
