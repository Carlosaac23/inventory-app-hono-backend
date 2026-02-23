import { Hono } from 'hono';

import {
  getAllCarsController,
  addCarController,
} from '../controllers/index.js';
export const routes = new Hono();

routes.get('/cars', getAllCarsController);
routes.post('/add', addCarController);
