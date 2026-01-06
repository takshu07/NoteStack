import { z } from "zod";

export const RegisterauthSchema = z.object({
    name: z.string().min(2, { message: "Name must be at least 2 characters" }).max(50, { message: "Name must not exceed 50 characters" }),
  email: z.email({ message: "Invalid email address" }),

  password: z
    .string()
    .min(6, { message: "Password must be at least 6 characters" })
    .max(20, { message: "Password must not exceed 20 characters" }),
});
