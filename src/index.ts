import { Hono } from "hono";
import { hostname } from "os";
import { name, version } from "../package.json";

import { RouteAdapter } from "./infra/adapters/routeAdapter";
import { environmentVariables } from "./main/config/environmentVariables";
import { authUser } from "./main/factory/user/authUserFactory";
import { RouteLogMiddleware } from "./main/middlewares/routeLogMiddleware";
import { userRoutes } from "./main/routes/user.routes";

const app = new Hono();
const { adaptRoute } = new RouteAdapter();

app.use("*", (c, next) => RouteLogMiddleware.logRoute(c, next));

app.get("/health-check", (c) => {
  const message = `Service ${name} is healthy on container ${hostname()} using version ${version}`;
  return c.text(message);
});

app.post("/auth", async (c) => await adaptRoute(c, authUser.handle));
app.route("/users", userRoutes);

export default {
  port: environmentVariables.PORT,
  fetch: app.fetch,
};
