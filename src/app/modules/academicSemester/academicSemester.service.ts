/* eslint-disable @typescript-eslint/no-explicit-any */
import { AcademicSemester, Prisma } from '@prisma/client';
import { paginationHelpers } from '../../../helpers/paginationHelper';
import { IGenericResponse } from '../../../interfaces/common';
import { IPaginationOptions } from '../../../interfaces/pagination';
import prisma from '../../../shared/prisma';
import { AcademicSemesterSearchableFelids } from './academicSemester.constants';
import { IAcademicSemesterFilterRequest } from './academicSemester.interface';

const insertIntoDB = async (
  academicSemesterData: AcademicSemester,
): Promise<AcademicSemester> => {
  const result = await prisma.academicSemester.create({
    data: academicSemesterData,
  });
  return result;
};

const getAllFormDB = async (
  filters: IAcademicSemesterFilterRequest,
  options: IPaginationOptions,
): Promise<IGenericResponse<AcademicSemester[]>> => {
  const { searchTerm, ...filterData } = filters;

  const andCondition = [];
  if (searchTerm) {
    andCondition.push({
      OR: AcademicSemesterSearchableFelids.map(filed => ({
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
  const whereCondition: Prisma.AcademicSemesterWhereInput =
    andCondition.length > 0 ? { AND: andCondition } : {};
  const { page, limit, skip } = paginationHelpers.calculatePagination(options);
  const result = await prisma.academicSemester.findMany({
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
  const total = await prisma.academicSemester.count();

  return {
    meta: {
      total,
      page,
      limit,
    },
    data: result,
  };
};

const getDataById = async (id: string): Promise<AcademicSemester | null> => {
  const result = await prisma.academicSemester.findUnique({
    where: {
      id,
    },
  });
  return result;
};
const updateIntoDB = async (
  id: string,
  payload: Partial<AcademicSemester>,
): Promise<AcademicSemester> => {
  const result = await prisma.academicSemester.update({
    where: {
      id,
    },
    data: payload,
  });
  return result;
};
const deleteIntoDB = async (id: string): Promise<AcademicSemester> => {
  const result = await prisma.academicSemester.delete({
    where: {
      id,
    },
  });
  return result;
};
export const AcademicSemesterService = {
  insertIntoDB,
  getAllFormDB,
  getDataById,
  updateIntoDB,
  deleteIntoDB,
};
