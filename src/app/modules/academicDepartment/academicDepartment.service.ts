/* eslint-disable @typescript-eslint/no-explicit-any */
import { AcademicDepartment, Prisma } from '@prisma/client';
import { paginationHelpers } from '../../../helpers/paginationHelper';
import { IGenericResponse } from '../../../interfaces/common';
import { IPaginationOptions } from '../../../interfaces/pagination';
import prisma from '../../../shared/prisma';
import { AcademicDepartmentSearchableFields } from './academicDepartment.constants';
import { IAcademicDepartmentFilterRequest } from './academicDepartment.interface';

const insertIntoDB = async (
  academicDepartment: AcademicDepartment,
): Promise<AcademicDepartment> => {
  const result = await prisma.academicDepartment.create({
    data: academicDepartment,
    include: {
      academicFaculty: true,
    },
  });
  return result;
};

const getAllData = async (
  filters: IAcademicDepartmentFilterRequest,
  options: IPaginationOptions,
): Promise<IGenericResponse<AcademicDepartment[]>> => {
  const { searchTerm, ...filterData } = filters;
  const { page, limit, skip } = paginationHelpers.calculatePagination(options);
  const andCondition = [];
  if (searchTerm) {
    andCondition.push({
      OR: AcademicDepartmentSearchableFields.map(filed => ({
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
  const whereCondition: Prisma.AcademicDepartmentWhereInput =
    andCondition.length > 0 ? { AND: andCondition } : {};
  const result = await prisma.academicDepartment.findMany({
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
    },
  });
  const total = await prisma.academicDepartment.count();

  return {
    meta: {
      page,
      limit,
      total,
    },
    data: result,
  };
};

const getSingleData = async (
  id: string,
): Promise<AcademicDepartment | null> => {
  const result = await prisma.academicDepartment.findUnique({
    where: {
      id,
    },
    include: {
      academicFaculty: true,
    },
  });
  return result;
};
const updateIntoDB = async (
  id: string,
  payload: Partial<AcademicDepartment>,
): Promise<AcademicDepartment> => {
  const result = await prisma.academicDepartment.update({
    where: {
      id,
    },
    include: {
      academicFaculty: true,
    },
    data: payload,
  });
  return result;
};
const deleteIntoDB = async (id: string): Promise<AcademicDepartment> => {
  const result = await prisma.academicDepartment.delete({
    where: {
      id,
    },
    include: {
      academicFaculty: true,
    },
  });
  return result;
};

export const AcademicDepartmentService = {
  insertIntoDB,
  getAllData,
  getSingleData,
  updateIntoDB,
  deleteIntoDB,
};
