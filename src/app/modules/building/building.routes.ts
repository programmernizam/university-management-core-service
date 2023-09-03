import express from 'express';
import validateRequest from '../../middlewares/validateRequest';
import { BuildingService } from './building.service';
import { BuildingValidation } from './building.validation';

const router = express.Router();

router.post(
  '/',
  validateRequest(BuildingValidation.create),
  BuildingService.insertIntoDB,
);

export const BuildingRoutes = router;
