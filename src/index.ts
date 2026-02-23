import { Hono } from 'hono';
import { cors } from 'hono/cors';

import { routes } from './routes/index.js';

const app = new Hono();

app.use('*', cors());
app.route('/', routes);

export default app;
