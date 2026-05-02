import { Hono } from 'hono';

import {
  addCar,
  deleteCar,
  editCar,
  getAllCars,
  getCarById,
} from '../config/queries.js';
import { NotFoundError } from '../middleware/error.js';
import {
  carFieldsSchema,
  carIdParam,
  updateCarSchema,
} from '../types/index.js';

const routes = new Hono();

// Add car
routes.post('/add', async c => {
  const body = carFieldsSchema.safeParse(await c.req.json());

  if (!body.success) {
    return c.json({ msg: 'Invalid data', errors: body.error.issues }, 400);
  }

  await addCar(body.data);
  return c.json({ msg: 'Car successfully added.' });
});

// Get cars
routes.get('/', async c => {
  const cars = await getAllCars();

  if (!cars) {
    return c.json({ msg: 'Cars not found' }, 404);
  }

  return c.json(cars);
});

// Edit car
routes.put('/:id/edit', async c => {
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
});

// Delete car
routes.delete('/:id/delete', async c => {
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
});

export default routes;
