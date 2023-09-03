import { Room } from '@prisma/client';
import prisma from '../../../shared/prisma';

const insertIntoDB = async (room: Room): Promise<Room> => {
  const result = await prisma.room.create({
    data: room,
  });
  return result;
};
const getAllData = async () => {
  const result = await prisma.room.findMany();
  return result;
};
const getSingleData = async (id: string): Promise<Room | null> => {
  const result = await prisma.room.findUnique({ where: { id } });
  return result;
};

export const RoomService = {
  insertIntoDB,
  getAllData,
  getSingleData,
};
