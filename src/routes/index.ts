import { Hono } from 'hono';

import {
  getAllCarsController,
  addCarController,
  editCarController,
  deleteCarController,
} from '../controllers/index.js';
export const routes = new Hono();

routes.get('/cars', getAllCarsController);
routes.post('/add', addCarController);
routes.put('/:id/edit', editCarController);
routes.delete('/:id/delete', deleteCarController);
