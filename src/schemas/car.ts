import { z } from 'zod';

export const carSchema = z.object({
  car_model: z.string().min(3, 'Model must be at least 3 characters long'),
  car_brand: z
    .string()
    .min(3, 'Brand must be at least 3 characters long')
    .regex(
      /^[a-zA-Z\s-]+$/,
      'Brand can only contain letters, spaces, and hyphens',
    ),
  car_color: z.string(),
  car_year: z
    .number()
    .int()
    .min(1886, 'Year must be 1886 or newer')
    .max(new Date().getFullYear() + 1, 'Years is too far in the future'),
  car_photo: z.url('Please enter a valid URL'),
});

export const carIdParam = z.uuid();
