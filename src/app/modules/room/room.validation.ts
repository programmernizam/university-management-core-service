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

export const RoomValidation = {
  create,
};
