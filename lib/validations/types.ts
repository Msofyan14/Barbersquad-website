import { z } from "zod";

export const FormLoginValidation = z.object({
  email: z
    .string()
    .email()
    .min(1, { message: "Email is required" })
    .max(30, { message: "Maximum 30 Characters" }),
  password: z
    .string()
    .min(6, { message: "Password Minimum 6 Characters" })
    .max(20, { message: "Password Maximum 20 Characters" }),
});

export const FormTeamsValidation = z.object({
  name: z.string().min(1, { message: "Name is required" }),
  email: z
    .string()
    .email()
    .min(1, { message: "Email is required" })
    .max(30, { message: "Maximum 30 Characters" }),
  whatsapp: z.coerce.number().min(10, { message: "Minimum 10 Characters" }),
  image: z.string().min(1, { message: "Image is required" }),
});

export const FormProductsValidation = z.object({
  name: z.string().min(1, { message: "Name is required" }),
  price: z.coerce.number().min(1, { message: "Price is required" }),
  description: z.string().min(1, { message: "Description is required" }),
  images: z.array(z.string()).min(1, { message: "Images is required" }),
});

export const FormGalleryValidation = z.object({
  name: z.string().min(1, { message: "Name is required" }),
  images: z.array(z.string()).min(1, { message: "Images is required" }),
});
