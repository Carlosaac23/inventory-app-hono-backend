import type { Car } from '../types/index.js';

import { pool } from './db.js';

export async function getAllCars() {
  const { rows } = await pool.query('SELECT * FROM cars');
  return rows;
}

export async function addCar({
  car_model,
  car_brand,
  car_color,
  car_year,
  car_photo,
}: Car) {
  await pool.query(
    'INSERT INTO cars (car_model, car_brand, car_color, car_year, car_photo) VALUES ($1, $2, $3, $4, $5)',
    [car_model, car_brand, car_color, car_year, car_photo],
  );
}

export async function editCar(
  car_id: string,
  { car_model, car_brand, car_color, car_year, car_photo }: Car,
) {
  await pool.query(
    'UPDATE cars SET car_model = $1, car_brand = $2, car_color = $3, car_year = $4, car_photo = $5 WHERE car_id = $6',
    [car_model, car_brand, car_color, car_year, car_photo, car_id],
  );
}

export async function deleteCar(carID: string) {
  await pool.query('DELETE FROM cars WHERE car_id = $1', [carID]);
}
