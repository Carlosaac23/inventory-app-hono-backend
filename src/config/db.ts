import { SQL } from 'bun';

export const pg = new SQL(Bun.env.DB_URL!);
