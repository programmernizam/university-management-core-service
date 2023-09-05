import express from 'express';
import validateRequest from '../../middlewares/validateRequest';
import { CourseController } from './course.controller';
import { CourseValidation } from './course.validation';

const router = express.Router();

router.get('/', CourseController.getAllData);
router.get('/:id', CourseController.getSingleData);
router.post(
  '/',
  validateRequest(CourseValidation.create),
  CourseController.insertIntoDB,
);
router.patch(
  '/',
  validateRequest(CourseValidation.update),
  CourseController.updateData,
);
router.delete('/', CourseController.deleteData);

export const CourseRoutes = router;
