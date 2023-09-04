import { Room } from '@prisma/client';
import prisma from '../../../shared/prisma';

const insertIntoDB = async (room: Room): Promise<Room> => {
  const result = await prisma.room.create({
    data: room,
  });
  return result;
};
const getAllData = async () => {
  const result = await prisma.room.findMany({
    include: {
      building: true,
    },
  });
  return result;
};
const getSingleData = async (id: string): Promise<Room | null> => {
  const result = await prisma.room.findUnique({
    where: { id },
    include: {
      building: true,
    },
  });
  return result;
};
const updateIntoDB = async (
  id: string,
  payload: Partial<Room>,
): Promise<Room> => {
  const result = await prisma.room.update({
    where: { id },
    data: payload,
    include: {
      building: true,
    },
  });
  return result;
};

const deleteIntoDB = async (id: string) => {
  const result = await prisma.room.delete({
    where: { id },
  });
  return result;
};

export const RoomService = {
  insertIntoDB,
  getAllData,
  getSingleData,
  updateIntoDB,
  deleteIntoDB,
};
