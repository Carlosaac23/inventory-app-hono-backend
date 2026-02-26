import type { Car } from '../types/index.js';

import { sql } from './db.js';

export async function getAllCars() {
  try {
    return await sql`SELECT * FROM cars`;
  } catch (error: unknown) {
    if (error instanceof Error) throw new Error(error.message);
  }
}

export async function getCarById(carID: string) {
  try {
    const rows = await sql`SELECT * FROM cars WHERE car_id = ${carID}`;
    return rows[0];
  } catch (error) {
    if (error instanceof Error) throw new Error(error.message);
  }
}

export async function addCar({
  car_model,
  car_brand,
  car_color,
  car_year,
  car_photo,
}: Car) {
  try {
    await sql`INSERT INTO cars (car_model, car_brand, car_color, car_year, car_photo) VALUES (${car_model}, ${car_brand}, ${car_color}, ${car_year}, ${car_photo})`;
  } catch (error) {
    if (error instanceof Error) throw new Error(error.message);
  }
}

export async function editCar(
  cardId: string,
  { car_model, car_brand, car_color, car_year, car_photo }: Car,
) {
  try {
    await sql`UPDATE cars SET car_model = ${car_model}, car_brand = ${car_brand}, car_color = ${car_color}, car_year = ${car_year}, car_photo = ${car_photo} WHERE car_id = ${cardId}`;
  } catch (error) {
    if (error instanceof Error) throw new Error(error.message);
  }
}

export async function deleteCar(carID: string) {
  try {
    await sql`DELETE FROM cars WHERE car_id = ${carID}`;
  } catch (error) {
    if (error instanceof Error) throw new Error(error.message);
  }
}
