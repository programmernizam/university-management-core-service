/* eslint-disable @typescript-eslint/no-explicit-any */
import { Prisma, Room } from '@prisma/client';
import { paginationHelpers } from '../../../helpers/paginationHelper';
import { IGenericResponse } from '../../../interfaces/common';
import { IPaginationOptions } from '../../../interfaces/pagination';
import prisma from '../../../shared/prisma';
import { RoomFilterFields } from './room.constants';
import { IRoomFilterableRequest } from './room.interface';

const insertIntoDB = async (room: Room): Promise<Room> => {
  const result = await prisma.room.create({
    data: room,
  });
  return result;
};
const getAllData = async (
  filters: IRoomFilterableRequest,
  options: IPaginationOptions,
): Promise<IGenericResponse<Room[]>> => {
  const { searchTerm, ...filterData } = filters;
  const { page, limit, skip } = paginationHelpers.calculatePagination(options);

  const andCondition = [];
  if (searchTerm) {
    andCondition.push({
      OR: RoomFilterFields.map(field => ({
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
  const whereCondition: Prisma.RoomWhereInput =
    andCondition.length > 0 ? { AND: andCondition } : {};
  const result = await prisma.room.findMany({
    where: whereCondition,
    skip,
    take: limit,
    include: {
      building: true,
    },
  });
  const total = await prisma.room.count();
  return {
    meta: {
      page,
      limit,
      total,
    },
    data: result,
  };
};
const getSingleData = async (id: string): Promise<Room | null> => {
  const result = await prisma.room.findUnique({
    where: { id },
    include: {
      building: true,
    },
  });
  return result;
};
const updateIntoDB = async (
  id: string,
  payload: Partial<Room>,
): Promise<Room> => {
  const result = await prisma.room.update({
    where: { id },
    data: payload,
    include: {
      building: true,
    },
  });
  return result;
};

const deleteIntoDB = async (id: string) => {
  const result = await prisma.room.delete({
    where: { id },
  });
  return result;
};

export const RoomService = {
  insertIntoDB,
  getAllData,
  getSingleData,
  updateIntoDB,
  deleteIntoDB,
};
