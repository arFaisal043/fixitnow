import { z } from 'zod';

const createCategoryValidationSchema = z.object({
  body: z.object({
    name: z.string(),
    description: z.string(),
  }),
});

export const CategoryValidation = {
  createCategoryValidationSchema,
};
