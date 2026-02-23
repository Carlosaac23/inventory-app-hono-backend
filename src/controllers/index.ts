import type { Context } from 'hono';

import type { Car } from '../types/index.js';

import { getAllCars, addCar, editCar, deleteCar } from '../config/queries.js';

export async function getAllCarsController(c: Context) {
  try {
    const allCars = await getAllCars();

    if (!allCars) {
      const error = new Error('Unable to load cars');
      c.status(500);
      return c.json({ msg: error.message });
    }

    return c.json(allCars);
  } catch (error) {
    console.error('Controller error:', error);
    c.status(500);
    return c.json({ msg: 'Internal server error' });
  }
}

export async function addCarController(c: Context) {
  try {
    const body = await c.req.json();
    await addCar(body);
    return c.json({ msg: 'Car successfully added.' });
  } catch (error) {
    console.error('Controller error:', error);
    c.status(400);
    return c.json({ msg: 'Invalid request data' });
  }
}

export async function editCarController(c: Context) {
  try {
    const body = await c.req.json();
    const carID = c.req.param('id');

    const allCars = await getAllCars();
    const currentCar = allCars.find((car: Car) => car.car_id === carID);

    if (!currentCar) {
      const error = new Error('Car does not exist.');
      c.status(404);
      return c.json({ msg: error.message });
    }

    const updatedCar = { ...currentCar, ...body };

    await editCar(carID, updatedCar);
    return c.json({ msg: 'Car successfully updated.' });
  } catch (error) {
    console.error('Controller error:', error);
    c.status(400);
    return c.json({ msg: 'Invalid request data' });
  }
}

export async function deleteCarController(c: Context) {
  try {
    const carID = c.req.param('id');

    const allCars = await getAllCars();
    const currentCar = allCars.find((car: Car) => car.car_id === carID);

    if (!currentCar) {
      const error = new Error('Car does not exist.');
      c.status(404);
      return c.json({ msg: error.message });
    }

    await deleteCar(carID);
    return c.json({ msg: 'Car successfully deleted.' });
  } catch (error) {
    console.error('Controller error:', error);
    c.status(500);
    return c.json({ msg: 'Internal server error' });
  }
}
