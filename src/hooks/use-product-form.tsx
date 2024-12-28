'use client'

import { ProductSchema } from "@/lib/schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { toast } from "./use-toast";
import { ToastAction } from "@/components/ui/toast"

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
      categories: [],
      image: undefined,
    },
  });

  const onSubmit = async (values: z.infer<typeof ProductSchema>) => {
    try {
      if (!values.image) {
        throw new Error("No image file provided");
      }
  
      
      const reader = new FileReader();
      reader.readAsDataURL(values.image); 
  
      reader.onloadend = async () => {
        const imageData = reader.result;
  
        const response = await fetch("/api/CreateProduct", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            ...values,
            file: imageData,
          }),
        });
  
        if (!response.ok) throw new Error("Failed to add product");
        toast({
          title: "Product added successfully ",
          variant: "success"
        })
        console.log("Product added successfully");
        
      };
    } catch (error) {
      toast({
        title: "Error adding product ",
        variant: "destructive"
      })
      console.error("Error adding product:", error);
    }
  };
  

  return { form, onSubmit };
}
