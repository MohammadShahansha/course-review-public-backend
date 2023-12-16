import express from 'express';
import { reviewController } from './review.controller';
const router = express.Router();

router.post('/reviews', reviewController.createReview);
router.get('/reviews', reviewController.getAllReview);
router.get(
  '/courses/:courseId/reviews',
  reviewController.getAllReviewWithCourse,
);
// router.get('/:id', courseController.getSingleCourse);
// router.put('/courses/:courseId', courseController.updateCourse);
// router.delete('/:id', courseController.deleteCourse);

export const reviewRouter = router;
