import { Hono } from 'hono';
import { cors } from 'hono/cors';

import { routes } from './routes/index.js';

const app = new Hono();

app.use(
  '*',
  cors({
    origin: [process.env.FRONTEND_URL!],
    allowMethods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    allowHeaders: ['Content-Type'],
  }),
);
app.route('/', routes);

export default app;
