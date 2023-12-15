import express from 'express';
import { courseController } from './course.controllers';
const router = express.Router();

router.post('/course', courseController.createCourse);
router.get('/courses', courseController.getAllCourse);
// router.get('/:id', courseController.getSingleCourse);
router.put('/courses/:courseId', courseController.updateCourse);
// router.delete('/:id', courseController.deleteCourse);

export const courseRouter = router;
