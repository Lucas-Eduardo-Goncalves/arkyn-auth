import z from "zod";
import { paginationSchema } from "../template/pagination";

const authUserSchema = z.object({
  email: z.string().email("Invalid email format"),
  password: z.string().min(8, "Password must be at least 8 characters"),
});

const createUserSchema = z.object({
  name: z.string().min(1, "Name is required"),
  email: z.string().email("Invalid email format"),
  utc: z.number(),
  password: z.string().min(8, "Password must be at least 8 characters"),
});

const updateUserSchema = z.object({
  userId: z.string().uuid("Invalid id format"),
  name: z.string().min(1, "Name is required").optional(),
  utc: z.number().optional(),
});

const changeUserPasswordSchema = z.object({
  userId: z.string().uuid("Invalid id format"),
  currentPassword: z
    .string()
    .min(8, "Current password must be at least 8 characters"),
  newPassword: z.string().min(8, "New password must be at least 8 characters"),
});

const deleteUserSchema = z.object({
  userId: z.string().uuid("Invalid id format"),
});

const listUsersSchema = paginationSchema.extend({
  name: z.string().min(1, "Name must be at least 1 character").optional(),
  sort: z.enum(["createdAt", "name", "updatedAt"]).optional(),
});

export {
  authUserSchema,
  changeUserPasswordSchema,
  createUserSchema,
  deleteUserSchema,
  updateUserSchema,
  listUsersSchema,
};
