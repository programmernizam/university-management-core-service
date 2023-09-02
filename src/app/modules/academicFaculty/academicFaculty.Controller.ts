import { AcademicFaculty } from '@prisma/client';
import { Request, Response } from 'express';
import httpStatus from 'http-status';
import catchAsync from '../../../shared/catchAsync';
import pick from '../../../shared/pick';
import sendResponse from '../../../shared/sendResponse';
import { AcademicFacultyService } from './academicFaculty.service';

const insertIntoDB = catchAsync(async (req: Request, res: Response) => {
  const result = await AcademicFacultyService.insertIntoDB(req.body);
  sendResponse<AcademicFaculty>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Academic Faculty successfully created!',
    data: result,
  });
});
const getAllData = catchAsync(async (req: Request, res: Response) => {
  const filters = pick(req.query, ['searchTerm']);
  const options = pick(req.query, ['limit', 'page', 'sortBy', 'sortOrder']);
  const result = await AcademicFacultyService.getAllData(filters, options);
  sendResponse<AcademicFaculty[]>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Academic Faculty data Faceted!',
    meta: result.meta,
    data: result.data,
  });
});
const getSingleData = catchAsync(async (req: Request, res: Response) => {
  const result = await AcademicFacultyService.getSingleData(req.params.id);
  sendResponse<AcademicFaculty>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Academic Faculty data faceted!',
    data: result,
  });
});

const updateIntoDB = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params;
  const payload = req.body;
  const result = await AcademicFacultyService.updateIntoDB(id, payload);
  sendResponse<AcademicFaculty>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Academic Faculty update successfully!',
    data: result,
  });
});
const deleteIntoDB = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params;
  const result = await AcademicFacultyService.deleteIntoDB(id);
  sendResponse<AcademicFaculty>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Academic Faculty delete successfully!',
    data: result,
  });
});

export const AcademicFacultyController = {
  insertIntoDB,
  getAllData,
  getSingleData,
  updateIntoDB,
  deleteIntoDB,
};
