import type { Context, Next } from 'hono';

export const errorHandler = async (c: Context, next: Next) => {
  try {
    await next();
  } catch (err) {
    console.error('Unhandled error:', err);

    const message =
      err instanceof Error ? err.message : 'Internal server error';
    const status = err instanceof HTTPError ? err.status : 500;

    return c.json({ msg: message }, status as 400 | 404 | 500);
  }
};

export class HTTPError extends Error {
  constructor(
    message: string,
    public status: number = 500,
  ) {
    super(message);
    this.name = 'HTTPError';
  }
}

export class NotFoundError extends HTTPError {
  constructor(message: string) {
    super(message, 404);
    this.name = 'NotFoundError';
  }
}
