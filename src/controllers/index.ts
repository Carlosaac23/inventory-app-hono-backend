import type { Context } from 'hono';

import { getAllCars, addCar } from '../config/queries.js';

export async function getAllCarsController(c: Context) {
  try {
    const data = await getAllCars();

    if (!data) {
      const error = new Error('Unable to load cars');
      c.status(500);
      return c.json({ msg: error.message });
    }

    return c.json(data);
  } catch (error) {
    console.error('Controller error:', error);
  }
}

export async function addCarController(c: Context) {
  try {
    const body = await c.req.json();
    await addCar(body);
    return c.json({ msg: 'Car successfully added.' });
  } catch (error) {
    console.error('Controller error:', error);
  }
}
