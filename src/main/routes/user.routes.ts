import { Hono } from "hono";

import { RouteAdapter } from "../../infra/adapters/routeAdapter";
import { createUser } from "../factory/user/createUserFactory";
import { deleteUser } from "../factory/user/deleteUserFactory";
import { listUser } from "../factory/user/listUserFactory";
import { listUsers } from "../factory/user/listUsersFactory";
import { updateUser } from "../factory/user/updateUserFactory";
import { validateUserId } from "../factory/user/validateUserIdFactory";

const userRoutes = new Hono();
const { adaptRoute } = new RouteAdapter();

userRoutes.get("/", async (c) => adaptRoute(c, listUsers.handle));
userRoutes.get("/once", async (c) => adaptRoute(c, listUser.handle));
userRoutes.post("/", async (c) => await adaptRoute(c, createUser.handle));
userRoutes.put("/:userId", async (c) => await adaptRoute(c, updateUser.handle));
userRoutes.delete(
  "/:userId",
  async (c) => await adaptRoute(c, deleteUser.handle)
);
userRoutes.post(
  "/validate",
  async (c) => await adaptRoute(c, validateUserId.handle)
);

export { userRoutes };
