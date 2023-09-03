/* eslint-disable @typescript-eslint/no-explicit-any */
import { Building, Prisma } from '@prisma/client';
import { paginationHelpers } from '../../../helpers/paginationHelper';
import { IGenericResponse } from '../../../interfaces/common';
import { IPaginationOptions } from '../../../interfaces/pagination';
import prisma from '../../../shared/prisma';
import { buildingFilterableFields } from './building.constants';
import { IBuildingSearchableFields } from './building.interface';

const insertIntoDB = async (building: Building): Promise<Building> => {
  const result = await prisma.building.create({ data: building });
  return result;
};
const getAllData = async (
  filters: IBuildingSearchableFields,
  options: IPaginationOptions,
): Promise<IGenericResponse<Building[]>> => {
  const { searchTerm, ...filterData } = filters;
  const { page, limit, skip } = paginationHelpers.calculatePagination(options);
  const andCondition = [];
  if (searchTerm) {
    andCondition.push({
      OR: buildingFilterableFields.map(field => ({
        [field]: {
          contains: searchTerm,
          mode: 'insensitive',
        },
      })),
    });
  }
  if (Object.keys(filterData).length > 0) {
    andCondition.push({
      AND: Object.keys(filterData).map(key => ({
        [key]: {
          equals: (filterData as any)[key],
        },
      })),
    });
  }
  const whereCondition: Prisma.BuildingWhereInput =
    andCondition.length > 0 ? { AND: andCondition } : {};
  const result = await prisma.building.findMany({
    where: whereCondition,
    skip,
    take: limit,
    orderBy:
      options.sortBy && options.sortOrder
        ? {
            [options.sortBy]: options.sortOrder,
          }
        : { createdAt: 'desc' },
  });
  const total = await prisma.building.count();
  return {
    meta: {
      page,
      limit,
      total,
    },
    data: result,
  };
};
const getSingleData = async (id: string): Promise<Building | null> => {
  const result = await prisma.building.findUnique({
    where: {
      id,
    },
  });
  return result;
};
const updateIntoDB = async (
  id: string,
  payload: Partial<Building>,
): Promise<Building> => {
  const result = await prisma.building.update({
    where: {
      id,
    },
    data: payload,
  });
  return result;
};
const deleteIntoDB = async (id: string) => {
  const result = await prisma.building.delete({
    where: {
      id,
    },
  });
  return result;
};
export const BuildingService = {
  insertIntoDB,
  getAllData,
  getSingleData,
  updateIntoDB,
  deleteIntoDB,
};
