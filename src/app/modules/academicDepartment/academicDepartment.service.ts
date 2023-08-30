import { AcademicDepartment } from '@prisma/client';
import prisma from '../../../shared/prisma';

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

export const AcademicDepartmentService = {
  insertIntoDB,
};
