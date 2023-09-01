/* eslint-disable @typescript-eslint/no-explicit-any */
import { AcademicFaculty, Prisma } from '@prisma/client';
import { paginationHelpers } from '../../../helpers/paginationHelper';
import { IGenericResponse } from '../../../interfaces/common';
import { IPaginationOptions } from '../../../interfaces/pagination';
import prisma from '../../../shared/prisma';
import { AcademicFacultySearchableFields } from './academicFaculty.constants';
import { IAcademicFacultyFilterRequest } from './academicFaculty.interface';

const insertIntoDB = async (
  academicFaculty: AcademicFaculty,
): Promise<AcademicFaculty> => {
  const result = await prisma.academicFaculty.create({
    data: academicFaculty,
  });
  return result;
};

const getAllData = async (
  filters: IAcademicFacultyFilterRequest,
  options: IPaginationOptions,
): Promise<IGenericResponse<AcademicFaculty[]>> => {
  const { searchTerm, ...filterData } = filters;
  const andCondition = [];
  if (searchTerm) {
    andCondition.push({
      OR: AcademicFacultySearchableFields.map(filed => ({
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
  const whereCondition: Prisma.AcademicFacultyWhereInput =
    andCondition.length > 0 ? { AND: andCondition } : {};
  const { page, limit, skip } = paginationHelpers.calculatePagination(options);
  const result = await prisma.academicFaculty.findMany({
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
  const total = await prisma.academicFaculty.count();
  return {
    meta: {
      page,
      limit,
      total,
    },
    data: result,
  };
};

const getSingleData = async (id: string): Promise<AcademicFaculty | null> => {
  const result = await prisma.academicFaculty.findUnique({
    where: {
      id,
    },
  });
  return result;
};

export const AcademicFacultyService = {
  insertIntoDB,
  getAllData,
  getSingleData,
};
