import { Hono } from "hono";
import { cors } from "hono/cors";
import { indexRoutes } from "./routes/indexRoutes.js";

const app = new Hono();

app.use("*", cors());
app.route("/", indexRoutes);

export default app;
