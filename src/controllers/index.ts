import type { Context } from 'hono';

import {
  getAllCars,
  getCarById,
  addCar,
  editCar,
  deleteCar,
} from '../config/queries.js';
import { NotFoundError } from '../middleware/error.js';
import {
  carFieldsSchema,
  updateCarSchema,
  carIdParam,
} from '../types/index.js';

export async function getAllCarsController(c: Context) {
  const allCars = await getAllCars();
  return c.json(allCars);
}

export async function addCarController(c: Context) {
  const body = carFieldsSchema.safeParse(await c.req.json());

  if (!body.success) {
    return c.json({ msg: 'Invalid data', errors: body.error.issues }, 400);
  }

  await addCar(body.data);
  return c.json({ msg: 'Car successfully added.' });
}

export async function editCarController(c: Context) {
  const carIdResult = carIdParam.safeParse(c.req.param('id'));
  if (!carIdResult.success) {
    return c.json(
      { msg: 'Invalid data', errors: carIdResult.error.issues },
      400,
    );
  }

  const bodyResult = updateCarSchema.safeParse(await c.req.json());
  if (!bodyResult.success) {
    return c.json(
      { msg: 'Invalid data', errors: bodyResult.error.issues },
      400,
    );
  }

  const carId = carIdResult.data;
  const currentCar = await getCarById(carId);

  if (!currentCar) {
    throw new NotFoundError('Car does not exist.');
  }

  await editCar(carId, bodyResult.data);
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
