import { Faculty } from '@prisma/client';
import { paginationHelpers } from '../../../helpers/paginationHelper';
import { IGenericResponse } from '../../../interfaces/common';
import { IPaginationOptions } from '../../../interfaces/pagination';
import prisma from '../../../shared/prisma';
import { IFacultyFilterRequest } from './facultly.interface';

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
  const { searchTerm, filterData } = filters;
  const { skip, page, limit } = paginationHelpers.calculatePagination(options);

  const andCondition = [];

  const result = await prisma.faculty.findMany({
    where: {
      OR: [],
    },
    skip,
    take: limit,
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

export const FacultyService = {
  insetIntoDB,
  getAllData,
  getSingleData,
};
