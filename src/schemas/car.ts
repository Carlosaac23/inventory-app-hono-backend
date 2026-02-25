import { z } from 'zod';

export const carSchema = z.object({
  car_model: z.string().min(1),
  car_brand: z.string().min(1),
  car_color: z.string(),
  car_year: z.number().int().min(1900).max(2100),
  car_photo: z.url(),
});

export const carIdParam = z.uuid();

export type CarInput = z.infer<typeof carSchema>;
