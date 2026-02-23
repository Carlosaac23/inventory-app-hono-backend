import { SQL } from "bun";

export const pg = new SQL(Bun.env.DATABASE_URL!);
