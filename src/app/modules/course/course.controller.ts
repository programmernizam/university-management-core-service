import { Course } from '@prisma/client';
import { Request, Response } from 'express';
import httpStatus from 'http-status';
import catchAsync from '../../../shared/catchAsync';
import sendResponse from '../../../shared/sendResponse';
import { CourseService } from './course.service';

const insertIntoDB = catchAsync(async (req: Request, res: Response) => {
  const result = await CourseService.insertIntoDB(req.body);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Course created successfully',
    data: result,
  });
});
const getAllData = catchAsync(async (req: Request, res: Response) => {
  const result = await CourseService.getAllData();
  sendResponse<Course[]>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Courses data faceted successfully',
    data: result,
  });
});
const getSingleData = catchAsync(async (req: Request, res: Response) => {
  const result = await CourseService.getSingleData(req.params.id);
  sendResponse<Course>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Course data faceted successfully',
    data: result,
  });
});

export const CourseController = {
  insertIntoDB,
  getAllData,
  getSingleData,
};
