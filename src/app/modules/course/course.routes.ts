import express from 'express';
import validateRequest from '../../middlewares/validateRequest';
import { CourseController } from './course.controller';
import { CourseValidation } from './course.validation';

const router = express.Router();

router.get('/', CourseController.getAllData);
router.post(
  '/',
  validateRequest(CourseValidation.create),
  CourseController.insertIntoDB,
);

export const CourseRoutes = router;
