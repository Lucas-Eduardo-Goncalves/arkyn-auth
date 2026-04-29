import { Hono } from "hono";
import { hostname } from "os";
import { name, version } from "../package.json";

import { environmentVariables } from "./main/config/environmentVariables";
import { RouteLogMiddleware } from "./main/middlewares/routeLogMiddleware";
import { authRoutes } from "./main/routes/auth";
import { userRoutes } from "./main/routes/user";

const app = new Hono();

app.use("*", (c, next) => RouteLogMiddleware.logRoute(c, next));

app.get("/health-check", (c) => {
  const message = `Service ${name} is healthy on container ${hostname()} using version ${version}`;
  return c.text(message);
});

app.route("/auth", authRoutes);
app.route("/users", userRoutes);

export default {
  port: environmentVariables.PORT,
  fetch: app.fetch,
};
