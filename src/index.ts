import { Hono } from "hono";
import { hostname } from "os";
import { version } from "../package.json";

import { RouteAdapter } from "./infra/adapters/routeAdapter";
import { environmentVariables } from "./main/config/environmentVariables";
import { authUser } from "./main/factory/user/authUserFactory";
import { RouteLogMiddleware } from "./main/middlewares/routeLogMiddleware";
import { userRoutes } from "./main/routes/user.routes";

const app = new Hono();
const { adaptRoute } = new RouteAdapter();

app.use("*", (c, next) => RouteLogMiddleware.logRoute(c, next));

app.get("/health-check", (c) =>
  c.text(`Container: ${hostname()} - Service is healthy on version ${version}`)
);

app.post("/auth", async (c) => await adaptRoute(c, authUser.handle));
app.route("/users", userRoutes);

export default {
  port: environmentVariables.PORT,
  fetch: app.fetch,
};
