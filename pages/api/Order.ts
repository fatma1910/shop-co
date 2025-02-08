import { NextApiRequest, NextApiResponse } from "next";
import { db } from "./dpConfig";
import { Order } from "./schema";


export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === "POST") {
    try {
      const { name, email, phone, street, city, products, createdBy , total } = req.body;


      if (!name || !email || !phone || !street || !city || !products || !createdBy) {
        return res.status(400).json({ error: "All fields are required" });
      }


      await db.insert(Order).values({
        name,
        email,
        phone,
        street,
        city,
        products: JSON.stringify(products),
        createdBy,
        total,
      });

      return res.status(201).json({ message: "Order created successfully" });
    } catch (error) {
      console.error("Error saving order:", error);
      return res.status(500).json({ error: "Internal Server Error" });
    }
  } else {
    return res.status(405).json({ error: "Method Not Allowed" });
  }
}
