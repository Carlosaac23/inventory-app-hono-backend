import { z } from 'zod';

export const carFieldsSchema = z.object({
  car_model: z
    .string()
    .min(1, 'Model is required')
    .min(3, 'Model must be at least 3 characters long'),
  car_brand: z
    .string()
    .min(1, 'Brand is required')
    .min(3, 'Brand must be at least 3 characters long')
    .regex(
      /^[a-zA-Z\s-]+$/,
      'Brand can only contain letters, spaces, and hyphens',
    ),
  car_color: z.string().min(1, 'Color is required'),
  car_year: z.coerce
    .number()
    .min(1, 'Years is required')
    .int('Year must be a whole number')
    .min(1886, 'Year must be 1886 or newer')
    .max(new Date().getFullYear() + 1, 'Year is too far in the future'),
  car_photo: z
    .string()
    .min(1, 'Photo URL is required')
    .pipe(z.url('Please anter a valid URL')),
});

export const createCarSchema = carFieldsSchema;
export const updateCarSchema = carFieldsSchema.partial();
export const carIdParam = z.uuid();

export type Car = z.infer<typeof updateCarSchema>;
