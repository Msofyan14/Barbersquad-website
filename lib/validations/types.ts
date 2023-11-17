import { z } from "zod";

export const FormLoginValidation = z.object({
  email: z
    .string()
    .email()
    .min(1, { message: "Username is required" })
    .max(30, { message: "Maximum 30 Characters" }),
  password: z
    .string()
    .min(6, { message: "Password Minimum 6 Characters" })
    .max(20, { message: "Password Maximum 20 Characters" }),
});
