import { Room } from '@prisma/client';
import { Request, Response } from 'express';
import httpStatus from 'http-status';
import catchAsync from '../../../shared/catchAsync';
import sendResponse from '../../../shared/sendResponse';
import { RoomService } from './room.service';

const insertIntoDB = catchAsync(async (req: Request, res: Response) => {
  const result = await RoomService.insertIntoDB(req.body);
  sendResponse<Room>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Room data created successfully',
    data: result,
  });
});
const getAllData = catchAsync(async (req: Request, res: Response) => {
  const result = await RoomService.getAllData();
  sendResponse<Room[]>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Rooms data faceted successfully',
    data: result,
  });
});
const getSingleData = catchAsync(async (req: Request, res: Response) => {
  const result = await RoomService.getSingleData(req.params.id);
  sendResponse<Room>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Room data faceted successfully',
    data: result,
  });
});
const updateIntoDB = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params;
  const payload = req.body;
  const result = await RoomService.updateIntoDB(id, payload);
  sendResponse<Room>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Room data update successfully',
    data: result,
  });
});

export const RoomController = {
  insertIntoDB,
  getAllData,
  getSingleData,
  updateIntoDB,
};
