import { z } from 'zod';

const createServiceValidationSchema = z.object({
  body: z.object({
    name: z.string(),
    description: z.string(),
    price: z.number(),
    categoryId: z.string(),
  }),
});

export const ServiceValidation = {
  createServiceValidationSchema,
};
