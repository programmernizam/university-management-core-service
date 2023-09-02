import { z } from 'zod';

const create = z.object({
  body: z.object({
    title: z.string({
      required_error: 'Academic Department title required',
    }),
    academicFacultyId: z.string({
      required_error: 'Academic Faculty Id required',
    }),
  }),
});
const update = z.object({
  body: z.object({
    title: z.string().optional(),
    academicFacultyId: z.string().optional(),
  }),
});

export const AcademicDepartmentValidation = {
  create,
  update,
};
