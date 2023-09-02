import express from 'express';
import { FacultyController } from './faculty.controller';

const router = express.Router();

router.get('/', FacultyController.getAllData);
router.get('/:id', FacultyController.getSingleData);
router.post('/', FacultyController.insertIntoDB);

export const FacultyRoutes = router;
