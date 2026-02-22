import { Hono } from 'hono';
import { indexRoutes } from './routes/indexRoutes.js';

const app = new Hono();

app.route('/', indexRoutes);

export default app;
