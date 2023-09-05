import { z } from 'zod';

const create = z.object({
  body: z.object({
    title: z.string({
      required_error: 'title is required',
    }),
    code: z.string({
      required_error: 'code is required',
    }),
    credits: z.string({
      required_error: 'credits is required',
    }),
  }),
});
const update = z.object({
  body: z.object({
    title: z.string().optional(),
    code: z.string().optional(),
    credits: z.string().optional(),
  }),
});

export const CourseValidation = {
  create,
  update,
};
