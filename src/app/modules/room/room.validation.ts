import { z } from 'zod';

const create = z.object({
  body: z.object({
    roomNumber: z.string({
      required_error: 'Room number required',
    }),
    floorNumber: z.string({ required_error: 'Floor number required' }),
    buildingId: z.string({ required_error: 'Building ID required' }),
  }),
});
const update = z.object({
  body: z.object({
    roomNumber: z.string().optional(),
    floorNumber: z.string().optional(),
    buildingId: z.string().optional(),
  }),
});

export const RoomValidation = {
  create,
  update,
};
