/* eslint-disable no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { Course, Prisma } from '@prisma/client';
import httpStatus from 'http-status';
import ApiError from '../../../errors/ApiError';
import { paginationHelpers } from '../../../helpers/paginationHelper';
import { IGenericResponse } from '../../../interfaces/common';
import { IPaginationOptions } from '../../../interfaces/pagination';
import prisma from '../../../shared/prisma';
import { CourseFiltersRequest } from './course.constants';
import { ICourseData, ICourseFilter } from './course.interface';

const insertIntoDB = async (data: ICourseData): Promise<any> => {
  const { preRequisiteCourses, ...courseData } = data;

  const newCourse = await prisma.$transaction(async transactionClient => {
    const result = await transactionClient.course.create({
      data: courseData,
    });
    if (!result) {
      throw new ApiError(httpStatus.BAD_REQUEST, 'Unable to create course');
    }
    if (preRequisiteCourses && preRequisiteCourses.length > 0) {
      for (let index = 0; index < preRequisiteCourses.length; index++) {
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        const createPrerequisite =
          await transactionClient.courseToPrerequisites.create({
            data: {
              courseId: result.id,
              prerequisiteId: preRequisiteCourses[index].courseId,
            },
          });
      }
      return result;
    }
  });
  if (newCourse) {
    const responseData = await prisma.course.findUnique({
      where: {
        id: newCourse.id,
      },
      include: {
        preRequisite: {
          include: {
            preRequisite: true,
          },
        },
        preRequisiteFor: {
          include: {
            course: true,
          },
        },
      },
    });
    return responseData;
  }
  throw new ApiError(httpStatus.BAD_REQUEST, 'Unable to create course');
};

const getAllData = async (
  filters: ICourseFilter,
  options: IPaginationOptions,
): Promise<IGenericResponse<any>> => {
  const { searchTerm } = filters;
  const { page, limit, skip } = paginationHelpers.calculatePagination(options);

  const andCondition = [];
  if (searchTerm) {
    andCondition.push({
      OR: CourseFiltersRequest.map(field => ({
        [field]: {
          contains: searchTerm,
          mode: 'insensitive',
        },
      })),
    });
  }
  const whereCondition: Prisma.CourseWhereInput =
    andCondition.length > 0 ? { AND: andCondition } : {};

  const result = await prisma.course.findMany({
    where: whereCondition,
    skip,
    take: limit,
    orderBy:
      options.sortBy && options.sortOrder
        ? { [options.sortBy]: options.sortOrder }
        : { createdAt: 'desc' },
    include: {
      preRequisite: true,
    },
  });
  const total = await prisma.course.count();
  return {
    meta: {
      page,
      limit,
      total,
    },
    data: result,
  };
};

const getSingleData = async (id: string) => {
  const result = await prisma.course.findUnique({
    where: {
      id,
    },
    include: {
      preRequisite: true,
    },
  });
  return result;
};

const updateData = async (
  id: string,
  payload: ICourseData,
): Promise<Course | null> => {
  const { preRequisiteCourses, ...CourseData } = payload;

  await prisma.$transaction(async transactionClient => {
    const result = await transactionClient.course.update({
      where: {
        id,
      },
      data: CourseData,
      include: {
        preRequisite: true,
      },
    });
    if (!result) {
      throw new ApiError(httpStatus.BAD_REQUEST, 'Unable to update course');
    }
    if (preRequisiteCourses && preRequisiteCourses.length > 0) {
      const deletePrerequisite = preRequisiteCourses.filter(
        coursePrerequisite =>
          coursePrerequisite.courseId && coursePrerequisite.isDeleted,
      );
      const newPrerequisite = preRequisiteCourses.filter(
        coursePrerequisite =>
          coursePrerequisite.courseId && !coursePrerequisite.isDeleted,
      );

      for (let index = 0; index < deletePrerequisite.length; index++) {
        await transactionClient.courseToPrerequisites.deleteMany({
          where: {
            AND: [
              { courseId: id },
              {
                prerequisiteId: deletePrerequisite[index].courseId,
              },
            ],
          },
        });
      }
      for (let index = 0; index < newPrerequisite.length; index++) {
        await transactionClient.courseToPrerequisites.create({
          data: {
            courseId: id,
            prerequisiteId: newPrerequisite[index].courseId,
          },
        });
      }
    }
    return result;
  });
  const responseData = await prisma.course.findUnique({
    where: {
      id: id,
    },
    include: {
      preRequisite: {
        include: {
          preRequisite: true,
        },
      },
      preRequisiteFor: {
        include: {
          course: true,
        },
      },
    },
  });
  return responseData;
};

const deleteData = async (id: string) => {
  const result = await prisma.course.delete({
    where: {
      id,
    },
  });
  return result;
};

export const CourseService = {
  insertIntoDB,
  getAllData,
  getSingleData,
  updateData,
  deleteData,
};
