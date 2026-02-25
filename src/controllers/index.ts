import type { Context } from 'hono';

import {
  getAllCars,
  getCarById,
  addCar,
  editCar,
  deleteCar,
} from '../config/queries.js';
import { NotFoundError } from '../middleware/error.js';
import { carSchema, carIdParam } from '../schemas/car.js';

export async function getAllCarsController(c: Context) {
  const allCars = await getAllCars();
  return c.json(allCars);
}

export async function addCarController(c: Context) {
  const body = carSchema.safeParse(await c.req.json());

  if (!body.success) {
    return c.json({ msg: 'Invalid data', errors: body.error.issues }, 400);
  }

  await addCar(body.data);
  return c.json({ msg: 'Car successfully added.' });
}

export async function editCarController(c: Context) {
  const body = carSchema.safeParse(await c.req.json());
  const carID = carIdParam.safeParse(c.req.param('id'));

  if (!carID.success) {
    return c.json({ msg: 'Invalid data', errors: carID.error.issues }, 400);
  }

  const currentCar = await getCarById(carID.data);

  if (!currentCar) {
    throw new NotFoundError('Car does not exist.');
  }

  const updatedCar = { ...currentCar, ...body.data };

  await editCar(carID.data, updatedCar);
  return c.json({ msg: 'Car successfully updated.' });
}

export async function deleteCarController(c: Context) {
  const carID = carIdParam.safeParse(c.req.param('id'));

  if (!carID.success) {
    return c.json({ msg: 'Invalid data', errors: carID.error.issues }, 400);
  }

  const currentCar = await getCarById(carID.data);

  if (!currentCar) {
    throw new NotFoundError('Car does not exist.');
  }

  await deleteCar(carID.data);
  return c.json({ msg: 'Car successfully deleted.' });
}
