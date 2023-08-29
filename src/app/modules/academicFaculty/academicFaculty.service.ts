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

export const AcademicFacultyService = {
  insertIntoDB,
};
