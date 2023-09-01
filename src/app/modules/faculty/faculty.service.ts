import { Faculty } from '@prisma/client';
import prisma from '../../../shared/prisma';

const insetIntoDB = async (faculty: Faculty): Promise<Faculty> => {
  const result = await prisma.faculty.create({
    data: faculty,
  });
  return result;
};

export const FacultyService = {
  insetIntoDB,
};
