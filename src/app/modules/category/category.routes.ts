import express from 'express';
import { categoryController } from './category.controller';

const router = express.Router();

router.post('/categories', categoryController.createCategory);
router.get('/categories', categoryController.getAllCategory);
// router.get('/:id', categoryController.getSingleCategory);
// router.put('/courses/:courseId', categoryController.updateCategory);
// router.delete('/:id', categoryController.deleteCategory);

export const categoriesRouter = router;
