import express from 'express';
import validateRequest from '../../middlewares/validateRequest';
import { FacultyController } from './faculty.controller';
import { FacultyValidation } from './faculty.validation';

const router = express.Router();

router.get('/', FacultyController.getAllData);
router.get('/:id', FacultyController.getSingleData);
router.post(
  '/',
  validateRequest(FacultyValidation.create),
  FacultyController.insertIntoDB,
);

export const FacultyRoutes = router;
