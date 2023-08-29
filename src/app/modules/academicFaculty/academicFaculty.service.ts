import { AcademicFaculty } from '@prisma/client';
import prisma from '../../../shared/prisma';

const insertIntoDB = async (
  academicFaculty: AcademicFaculty,
): Promise<AcademicFaculty> => {
  const result = await prisma.academicFaculty.create({
    data: academicFaculty,
  });
  return result;
};

const getAllData = async () => {
  const result = await prisma.academicFaculty.findMany();
  const total = await prisma.academicFaculty.count();
  return {
    meta: {
      page: 1,
      limit: 5,
      total,
    },
    data: result,
  };
};

export const AcademicFacultyService = {
  insertIntoDB,
  getAllData,
};
