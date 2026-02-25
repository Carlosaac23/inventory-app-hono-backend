import { serve } from '@hono/node-server';
import { Hono } from 'hono';
import { cors } from 'hono/cors';

import { errorHandler } from './middleware/error.js';
import { routes } from './routes/index.js';

const app = new Hono();

app.use('*', cors());
app.use(errorHandler);
app.route('/', routes);

serve(
  {
    fetch: app.fetch,
    port: 3000,
  },
  info => {
    console.log(`Server is running on http://localhost:${info.port}`);
  },
);
