import { NextApiRequest, NextApiResponse } from "next";

import { v2 as cloudinary } from "cloudinary";
import { db } from "./dpConfig";
import { Product } from "./schema";


cloudinary.config({
  cloud_name: process.env.CLOUDINARY_NAME,
  api_key: process.env.CLOUDINARY_KEY,
  api_secret: process.env.CLOUDINARY_SECRET,
});

export default async function handler(req:NextApiRequest, res:NextApiResponse) {
  if (req.method === "POST") {
    try {
      const { title, author, rate, price ,color, size , description, file,id } = req.body;


      const uploadResult = await cloudinary.uploader.upload(file, {
        folder: "Ecommerce",
      });


      await db.insert(Product).values({
        title,
        author,
        rate,
        price ,
        color ,
        size ,
        description,
        imagePublicId: uploadResult.public_id,
        imageUrl: uploadResult.secure_url,
      });

      res.status(200).json({ message: "Product added successfully" });
    } catch (error) {
      console.error("Error creating book:", error);
      res.status(500).json({ error: "Failed to add product" });
    }
  } else {
    res.status(405).json({ error: "Method not allowed" });
  }
}
