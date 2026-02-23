import type { Car } from '../types/index.js';

import { pg } from './db.js';
export async function getAllCars() {
  return await pg`SELECT * FROM cars`;
}

export async function addCar({
  car_model,
  car_brand,
  car_color,
  car_year,
  car_photo,
}: Car) {
  await pg`INSERT INTO cars (car_model, car_brand, car_color, car_year, car_photo) VALUES (${car_model}, ${car_brand}, ${car_color}, ${car_year}, ${car_photo})`;
}
