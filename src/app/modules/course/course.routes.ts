import express from 'express';
import { courseController } from './course.controllers';
import { updateCourseValidationSchema } from './course.zod.validation';
import validateRequest from '../../middlewares/validateRequest';
const router = express.Router();

router.post('/course', courseController.createCourse);
router.get('/courses', courseController.getAllCourse);
router.get('/courses/:courseId', courseController.getSingleCourse);
router.put(
  '/courses/:courseId',
  validateRequest(updateCourseValidationSchema),
  courseController.updateCourse,
);
router.get(
  '/courses/:courseId/reviews',
  courseController.getAllReviewWithCourse,
);
// router.delete('/:id', courseController.deleteCourse);

export const courseRouter = router;
