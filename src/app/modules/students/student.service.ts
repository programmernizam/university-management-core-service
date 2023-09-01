import { Student } from '@prisma/client';
import prisma from '../../../shared/prisma';

const insertIntoDB = async (student: Student): Promise<Student> => {
  const result = await prisma.student.create({
    data: student,
  });
  return result;
};

const getAllData = async () => {
  const result = await prisma.student.findMany({
    include: {
      academicSemester: true,
      academicDepartment: true,
      academicFaculty: true,
    },
  });
  return result;
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
