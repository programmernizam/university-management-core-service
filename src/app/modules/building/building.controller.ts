import { Building } from '@prisma/client';
import { Request, Response } from 'express';
import httpStatus from 'http-status';
import catchAsync from '../../../shared/catchAsync';
import pick from '../../../shared/pick';
import sendResponse from '../../../shared/sendResponse';
import { buildingSearchableFields } from './building.constants';
import { BuildingService } from './building.service';

const insertIntoDB = catchAsync(async (req: Request, res: Response) => {
  const result = await BuildingService.insertIntoDB(req.body);
  sendResponse<Building>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Building Data Created successfully',
    data: result,
  });
});
const getAllData = catchAsync(async (req: Request, res: Response) => {
  const filters = pick(req.query, buildingSearchableFields);
  const options = pick(req.query, ['page', 'limit', 'sortBy', 'sortOrder']);
  const result = await BuildingService.getAllData(filters, options);
  sendResponse<Building[]>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Buildings Data faceted successfully',
    meta: result.meta,
    data: result.data,
  });
});
const getSingleData = catchAsync(async (req: Request, res: Response) => {
  const result = await BuildingService.getSingleData(req.params.id);
  sendResponse<Building>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Building Data faceted successfully',
    data: result,
  });
});
const updateIntoDB = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params;
  const payload = req.body;
  const result = await BuildingService.updateIntoDB(id, payload);
  sendResponse<Building>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Building Data update successfully',
    data: result,
  });
});
const deleteIntoDB = catchAsync(async (req: Request, res: Response) => {
  const result = await BuildingService.deleteIntoDB(req.params.id);
  sendResponse<Building>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Building Data delete successfully',
    data: result,
  });
});

export const BuildingController = {
  insertIntoDB,
  getAllData,
  getSingleData,
  updateIntoDB,
  deleteIntoDB,
};
