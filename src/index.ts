import { Hono } from "hono";
import { hostname } from "os";
import { version } from "../package.json";

import { environmentVariables } from "./main/config/environmentVariables";
import { RouteLogMiddleware } from "./main/middlewares/routeLogMiddleware";
import { userRoutes } from "./main/routes/user.routes";

const app = new Hono();

app.use("*", (c, next) => RouteLogMiddleware.logRoute(c, next));

app.get("/health-check", (c) =>
  c.text(`Container: ${hostname()} - Service is healthy on version ${version}`)
);

app.route("/", userRoutes);

export default {
  port: environmentVariables.PORT,
  fetch: app.fetch,
};
