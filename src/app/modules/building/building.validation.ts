import { z } from 'zod';

const create = z.object({
  body: z.object({
    title: z.string({
      required_error: 'Building title is required',
    }),
  }),
});

export const BuildingValidation = {
  create,
};
