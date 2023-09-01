/* eslint-disable @typescript-eslint/no-explicit-any */
import { Prisma, Student } from '@prisma/client';
import { paginationHelpers } from '../../../helpers/paginationHelper';
import { IGenericResponse } from '../../../interfaces/common';
import { IPaginationOptions } from '../../../interfaces/pagination';
import prisma from '../../../shared/prisma';
import { StudentFilterableFields } from './student.constants';
import { IStudentFilterRequest } from './student.interface';

const insertIntoDB = async (student: Student): Promise<Student> => {
  const result = await prisma.student.create({
    data: student,
  });
  return result;
};

const getAllData = async (
  filters: IStudentFilterRequest,
  options: IPaginationOptions,
): Promise<IGenericResponse<Student[]>> => {
  const { searchTerm, ...filterData } = filters;
  const { skip, page, limit } = paginationHelpers.calculatePagination(options);
  const andCondition = [];
  if (searchTerm) {
    andCondition.push({
      OR: StudentFilterableFields.map(filed => ({
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
  const whereCondition: Prisma.StudentWhereInput =
    andCondition.length > 0 ? { AND: andCondition } : {};
  const result = await prisma.student.findMany({
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
      academicSemester: true,
      academicDepartment: true,
      academicFaculty: true,
    },
  });
  const total = await prisma.student.count();
  return {
    meta: {
      total,
      page,
      limit,
    },
    data: result,
  };
};

const getSingletData = async (id: string): Promise<Student | null> => {
  const result = await prisma.student.findUnique({
    where: { id },
    include: {
      academicSemester: true,
      academicDepartment: true,
      academicFaculty: true,
    },
  });
  return result;
};

export const StudentService = {
  insertIntoDB,
  getAllData,
  getSingletData,
};
