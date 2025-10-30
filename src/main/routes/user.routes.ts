import { Hono } from "hono";

import { RouteAdapter } from "../../infra/adapters/routeAdapter";
import { authUser } from "../factory/user/authUserFactory";
import { createUser } from "../factory/user/createUserFactory";
import { deleteUser } from "../factory/user/deleteUserFactory";
import { listUsers } from "../factory/user/listUsersFactory";
import { updateUser } from "../factory/user/updateUserFactory";

const userRoutes = new Hono();
const { adaptRoute } = new RouteAdapter();

userRoutes.post("/auth", async (c) => await adaptRoute(c, authUser.handle));

userRoutes.get("/users", async (c) => adaptRoute(c, listUsers.handle));
userRoutes.post("/users", async (c) => await adaptRoute(c, createUser.handle));
userRoutes.put(
  "/users/:userId",
  async (c) => await adaptRoute(c, updateUser.handle)
);
userRoutes.delete(
  "/users/:userId",
  async (c) => await adaptRoute(c, deleteUser.handle)
);

export { userRoutes };
