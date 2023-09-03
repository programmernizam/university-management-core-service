import { Building } from '@prisma/client';
import prisma from '../../../shared/prisma';

const insertIntoDB = async (building: Building): Promise<Building> => {
  const result = await prisma.building.create({ data: building });
  return result;
};

export const BuildingService = {
  insertIntoDB,
};
