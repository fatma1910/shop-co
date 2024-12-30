'use client'

import { ProductSchema } from "@/lib/schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { toast } from "./use-toast";
import { useRouter } from "next/navigation";



export default function UseProduct() {
  const form = useForm<z.infer<typeof ProductSchema>>({
    resolver: zodResolver(ProductSchema),
    defaultValues: {
      title: "",
      color: "",
      price: 0,
      description: "",
      size: [],
      rate: 0,
      categories: [],
      image: undefined,
    },
  });

  const router = useRouter();
  const onSubmit = async (values: z.infer<typeof ProductSchema>) => {

    try {
      if (!values.image) {
        throw new Error("No image file provided");
      }
  
      const formData = new FormData();
      formData.append("file", values.image);
      formData.append("upload_preset", "ml_default"); 
  
      const response = await fetch("https://api.cloudinary.com/v1_1/dbbiout5y/image/upload", {
        method: "POST",
        body: formData,
      });
  
      if (!response.ok) throw new Error("Failed to upload image to Cloudinary");
  
      const result = await response.json();
      console.log(result); 
  

      const productData = {
        ...values,
        image: result.secure_url, 
      };
  
      const backendResponse = await fetch("/api/CreateProduct", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(productData),
      });
  
      if (!backendResponse.ok) throw new Error("Failed to create product");
      
      toast({
        title: "Product added successfully!",
        variant: "success",
      });

      router.push("/");
  
    } catch (error) {
      toast({
        title: "Error adding product",
        variant: "destructive",
      });
      console.error("Error:", error);
    }
  };
  
  

  return { form, onSubmit };
}
