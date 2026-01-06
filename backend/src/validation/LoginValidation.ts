import { z } from "zod";

export const LoginauthSchema = z.object({
  email: z.email({ message: "Invalid email address" }),

  password: z
    .string()
    .min(6, { message: "Password must be at least 6 characters" })
    .max(20, { message: "Password must not exceed 20 characters" }),
});
