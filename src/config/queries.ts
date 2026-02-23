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

export async function editCar(
  car_id: string,
  { car_model, car_brand, car_color, car_year, car_photo }: Car,
) {
  await pg`UPDATE cars SET car_model = ${car_model}, car_brand = ${car_brand}, car_color = ${car_color}, car_year = ${car_year}, car_photo = ${car_photo} WHERE car_id = ${car_id}`;
}

export async function deleteCar(carID: string) {
  await pg`DELETE FROM cars WHERE car_id = ${carID}`;
}
