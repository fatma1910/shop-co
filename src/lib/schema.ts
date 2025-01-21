
"use client";
import { z } from "zod";

export const ProductSchema = z.object({
    title: z.string().min(1, { message: "Title is required." }),
    rate: z
      .number()
      .min(0, { message: "Rate must be at least 0." })
      .max(5, { message: "Rate cannot exceed 5." }),
    price: z.number().positive({ message: "Price must be a positive number." }),
    color: z.string().min(1, { message: "Color is required." }),
    size: z.array(z.string()).min(1, { message: "Please select at least one size" }),
    description: z.string().min(1, { message: "Description is required." }),
    image: z.instanceof(File, { message: "Image must be a valid file object." }),
    categories: z.array(z.number()).nonempty("At least one category is required"),

  })
export const OrderSchema = z.object({
    name: z.string().min(2, { message: "Name is required." }),
    street: z.string().min(2, { message: "Street is required." }),
    city: z.string().min(2, { message: "City is required." }),
    phone: z.string().min(13, { message: "Number must be 11 digits" }).max(13, { message: "Number must be 11 digits" }) ,
    email: z.string().min(1, { message: "email is required." }).email({message: "must be a valid email."}),
  })


