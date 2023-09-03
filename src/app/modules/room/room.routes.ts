import express from 'express';
import validateRequest from '../../middlewares/validateRequest';
import { RoomController } from './room.controller';
import { RoomValidation } from './room.validation';

const router = express.Router();

router.get('/', RoomController.getAllData);
router.get('/:id', RoomController.getSingleData);
router.post(
  '/',
  validateRequest(RoomValidation.create),
  RoomController.insertIntoDB,
);

export const RoomRoutes = router;
