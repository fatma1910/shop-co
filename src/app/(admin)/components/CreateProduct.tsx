'use client'

import { useEffect, useState } from "react"
import { db } from "../../../../pages/api/dpConfig"
import { getTableColumns } from "drizzle-orm"
import { Category } from "../../../../pages/api/schema"
import { desc } from "drizzle-orm";
import { CategoryProps } from "../../../../types"

const CreateProduct = () => {
    const [getCategories, setGetCategories] = useState<CategoryProps[]>([])

    useEffect(() => {
        getAllCategories();
      }, []);
    

    const getAllCategories = async () => {
        try {
            const result = await db
              .select({
                ...getTableColumns(Category),
              })
              .from(Category)
              
            setGetCategories(result);
          } catch (error) {
            console.error("Error fetching category:", error);
          }
    }
  return (
    <div>
        <h2>Product Details</h2>
        <div>
            
        </div>
    </div>
  )
}

export default CreateProduct