import { serve } from '@hono/node-server';
import { Hono } from 'hono';
import { cors } from 'hono/cors';

import { errorHandler } from './middleware/error.js';
import carsRoutes from './routes/cars.js';

const app = new Hono();

app.use(
  '*',
  cors({
    origin: `${process.env.FRONTEND_URL}`,
  }),
);
app.use(errorHandler);
app.route('/cars', carsRoutes);

serve(
  {
    fetch: app.fetch,
    port: 3000,
  },
  info => {
    console.log(`Server is running on http://localhost:${info.port}`);
  },
);
