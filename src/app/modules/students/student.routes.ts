import express from 'express';
import { StudentController } from './student.controller';
const router = express.Router();

router.get('/', StudentController.getAllData);
router.get('/:id', StudentController.getSingleData);
router.post('/', StudentController.insertIntoDB);

export const StudentRoutes = router;
