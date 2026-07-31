import { z } from 'zod';

const createServiceValidationSchema = z.object({
  body: z.object({
    name: z.string({ required_error: 'Name is required' }),
    description: z.string({ required_error: 'Description is required' }),
    price: z.number({ required_error: 'Price is required' }),
    categoryId: z.string({ required_error: 'Category ID is required' }),
  }),
});

export const ServiceValidation = {
  createServiceValidationSchema,
};
