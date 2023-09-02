import express from 'express';
import validateRequest from '../../middlewares/validateRequest';
import { StudentController } from './student.controller';
import { StudentValidation } from './student.validation';
const router = express.Router();

router.get('/', StudentController.getAllData);
router.get('/:id', StudentController.getSingleData);
router.post(
  '/',
  validateRequest(StudentValidation.create),
  StudentController.insertIntoDB,
);
router.patch(
  '/:id',
  validateRequest(StudentValidation.update),
  StudentController.updateIntoDB,
);

export const StudentRoutes = router;
