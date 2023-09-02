/* eslint-disable @typescript-eslint/no-explicit-any */
import { Faculty, Prisma } from '@prisma/client';
import { paginationHelpers } from '../../../helpers/paginationHelper';
import { IGenericResponse } from '../../../interfaces/common';
import { IPaginationOptions } from '../../../interfaces/pagination';
import prisma from '../../../shared/prisma';
import { FacultySearchableFields } from './faculty.constants';
import { IFacultyFilterRequest } from './faculty.interface';

const insetIntoDB = async (faculty: Faculty): Promise<Faculty> => {
  const result = await prisma.faculty.create({
    data: faculty,
  });
  return result;
};
const getAllData = async (
  filters: IFacultyFilterRequest,
  options: IPaginationOptions,
): Promise<IGenericResponse<Faculty[]>> => {
  const { searchTerm, ...filterData } = filters;
  const { skip, page, limit } = paginationHelpers.calculatePagination(options);

  const andCondition = [];
  if (searchTerm) {
    andCondition.push({
      OR: FacultySearchableFields.map(filed => ({
        [filed]: {
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
  const whereCondition: Prisma.FacultyWhereInput =
    andCondition.length > 0 ? { AND: andCondition } : {};

  const result = await prisma.faculty.findMany({
    where: whereCondition,
    skip,
    take: limit,
    orderBy:
      options.sortBy && options.sortOrder
        ? {
            [options.sortBy]: options.sortOrder,
          }
        : { createdAt: 'desc' },
    include: {
      academicFaculty: true,
      academicDepartment: true,
    },
  });
  const total = await prisma.faculty.count();
  return {
    meta: {
      page,
      limit,
      total,
    },
    data: result,
  };
};

const getSingleData = async (id: string): Promise<Faculty | null> => {
  const result = await prisma.faculty.findUnique({
    where: {
      id,
    },
    include: {
      academicFaculty: true,
      academicDepartment: true,
    },
  });
  return result;
};
const updateIntoDB = async (
  id: string,
  payload: Partial<Faculty>,
): Promise<Faculty> => {
  const result = await prisma.faculty.update({
    where: {
      id,
    },
    include: {
      academicDepartment: true,
      academicFaculty: true,
    },
    data: payload,
  });
  return result;
};
const deleteIntoDB = async (id: string): Promise<Faculty> => {
  const result = await prisma.faculty.delete({
    where: {
      id,
    },
    include: {
      academicDepartment: true,
      academicFaculty: true,
    },
  });
  return result;
};

export const FacultyService = {
  insetIntoDB,
  getAllData,
  getSingleData,
  updateIntoDB,
  deleteIntoDB,
};
