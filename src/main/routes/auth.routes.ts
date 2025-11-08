import { Hono } from "hono";

import { RouteAdapter } from "../../infra/adapters/routeAdapter";
import { authUser } from "../factory/auth/authUserFactory";

const authRoutes = new Hono();
const { adaptRoute } = new RouteAdapter();

authRoutes.post("/", async (c) => await adaptRoute(c, authUser.handle));

export { authRoutes };
