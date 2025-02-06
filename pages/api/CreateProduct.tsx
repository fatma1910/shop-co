import { NextApiRequest, NextApiResponse } from "next";

import { v2 as cloudinary } from "cloudinary";
import { db } from "./dpConfig";
import { Product, ProductCategory } from "./schema";


cloudinary.config({
  cloud_name: process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_KEY,
  api_secret: process.env.CLOUDINARY_SECRET,
});

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === "POST") {
    try {
      

      const { title, rate, price, color, size, description, image, categories } = req.body;

      if (!image) {
        throw new Error("Image data is missing");
      }

      const insertedProduct = await db
        .insert(Product)
        .values({
          title,
          rate,
          price,
          color,
          size,
          description,
          imageUrl: image, 
        })
        .returning({ id: Product.id });

      const productId = insertedProduct[0].id;

      if (categories?.length) {
        const categoryData = categories.map((categoryId: number) => ({
          productId,
          categoryId,
        }));
        await db.insert(ProductCategory).values(categoryData);
      }

      res.status(200).json({ message: "Product added successfully" });
    } catch (error) {
      console.error("Error creating product:", error);
      res.status(500).json({ error: "Failed to add product" });
    }
  } else {
    res.status(405).json({ error: "Method not allowed" });
  }
}




