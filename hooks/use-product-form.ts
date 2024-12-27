'use client'

import { ProductSchema } from "@/lib/schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

export default function UseProduct() {
  const form = useForm<z.infer<typeof ProductSchema>>({
    resolver: zodResolver(ProductSchema),
    defaultValues: {
      title: "",
      color: "",
      price: 0,
      description: "",
      size: "",
      rate: 0,
    },
  });

  const onSubmit = async (values: z.infer<typeof ProductSchema>) => {
    try {
      // Upload image using FileReader
      const reader = new FileReader();
      reader.readAsDataURL(values.image[0]); // Assuming `values.image` is a file input

      reader.onloadend = async () => {
        const imageData = reader.result;

        // Send API request
        const response = await fetch("/api/CreateProduct", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            ...values,
            file: imageData,
          }),
        });

        if (!response.ok) throw new Error("Failed to add product");

        console.log("Product added successfully");
      };
    } catch (error) {
      console.error("Error adding product:", error);
    }
  };

  return { form, onSubmit };
}
