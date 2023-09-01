import { Student } from '@prisma/client';
import { Request, Response } from 'express';
import httpStatus from 'http-status';
import catchAsync from '../../../shared/catchAsync';
import pick from '../../../shared/pick';
import sendResponse from '../../../shared/sendResponse';
import { StudentFilterableFields } from './student.constants';
import { StudentService } from './student.service';

const insertIntoDB = catchAsync(async (req: Request, res: Response) => {
  const result = await StudentService.insertIntoDB(req.body);
  sendResponse<Student>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Student successfully created!',
    data: result,
  });
});
const getAllData = catchAsync(async (req: Request, res: Response) => {
  const filters = pick(req.query, StudentFilterableFields);
  const options = pick(req.query, ['page', 'limit', 'sortBy', 'sortOrder']);
  const result = await StudentService.getAllData(filters, options);
  sendResponse<Student[]>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Students data faceted successfully!',
    meta: result.meta,
    data: result.data,
  });
});
const getSingleData = catchAsync(async (req: Request, res: Response) => {
  const result = await StudentService.getSingletData(req.params.id);
  sendResponse<Student>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Student data faceted successfully!',
    data: result,
  });
});

export const StudentController = {
  insertIntoDB,
  getAllData,
  getSingleData,
};
