import { z } from 'zod';

const create = z.object({
  body: z.object({
    studentId: z.string({
      required_error: 'Student ID required',
    }),
    firstName: z.string({ required_error: 'First name is required' }),
    lastName: z.string({ required_error: 'Last name is required' }),
    middleName: z.string({ required_error: 'Middle name is required' }),
    profileImage: z.string({
      required_error: 'Profile image is required',
    }),
    email: z.string({ required_error: 'Email is required' }),
    contactNo: z.string({ required_error: 'Contact no is required' }),
    gender: z.string({ required_error: 'Gender is required' }),
    bloodGroup: z.string({ required_error: 'Blood Group is required' }),
    academicSemesterId: z.string({
      required_error: 'Academic Semester ID is required',
    }),
    academicDepartmentId: z.string({
      required_error: 'Academic Department ID is required',
    }),
    academicFacultyId: z.string({
      required_error: 'Academic Faculty ID is required',
    }),
  }),
});

export const StudentValidation = {
  create,
};
