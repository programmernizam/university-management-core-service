import { Student } from '@prisma/client';
import prisma from '../../../shared/prisma';

const insertIntoDB = async (student: Student): Promise<Student> => {
  const result = await prisma.student.create({
    data: student,
  });
  return result;
};

export const StudentService = {
  insertIntoDB,
};
