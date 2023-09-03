import express from 'express';
import validateRequest from '../../middlewares/validateRequest';
import { BuildingController } from './building.controller';
import { BuildingValidation } from './building.validation';

const router = express.Router();
router.get('/', BuildingController.getAllData);
router.get('/:id', BuildingController.getSingleData);
router.post(
  '/',
  validateRequest(BuildingValidation.create),
  BuildingController.insertIntoDB,
);
router.patch('/:id', BuildingController.updateIntoDB);
router.delete('/:id', BuildingController.deleteIntoDB);

export const BuildingRoutes = router;
