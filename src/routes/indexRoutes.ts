import { Hono } from 'hono';

import {
  indexController,
  aboutController,
  usersController,
  getAddFormController,
  postAddFormController,
  deleteUserController,
} from '../controllers/indexController.js';
export const indexRoutes = new Hono();

indexRoutes.get('/', indexController);
indexRoutes.get('/about', aboutController);
indexRoutes.get('/users', usersController);
indexRoutes.get('/add', getAddFormController);
indexRoutes.post('/add', postAddFormController);
indexRoutes.post('/:id/delete', deleteUserController);
