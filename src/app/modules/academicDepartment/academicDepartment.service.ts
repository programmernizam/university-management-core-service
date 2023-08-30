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

const getAllData = async () => {
  const result = await prisma.academicDepartment.findMany({
    include: {
      academicFaculty: true,
    },
  });
  return result;
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

export const AcademicDepartmentService = {
  insertIntoDB,
  getAllData,
  getSingleData,
};
