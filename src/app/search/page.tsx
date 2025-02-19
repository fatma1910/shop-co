'use client'

import React, { useEffect, useState } from 'react'
import { db } from '../../../pages/api/dpConfig';
import { Product } from '../../../pages/api/schema';
import { getTableColumns } from 'drizzle-orm';
import { desc } from "drizzle-orm";
import { ProductData, ProductProps } from '../../../types';
import Card from '../components/Card';



const page = () => {
    const [search,setSearch] = useState("");
    const [allProducts,setAllProducts] = useState<ProductProps[]>([]);
    const [filteredProducts, setFilteredProducts] = useState<any[]>([]);

    useEffect(() => {
      getAllProducts()
    }, []); 

    const getAllProducts = async () => {
      try {
        const result = await db
          .select({
            ...getTableColumns(Product),
          })
          .from(Product)
          .orderBy(desc(Product.id));
        setAllProducts(result);
      } catch (error) {
        console.error("Error fetching books:", error);
      }
    };

    useEffect(() => {
      if (search.trim() === "") {
        setFilteredProducts([]); 
      } else {
        const filtered = allProducts.filter((product) =>
          product.title.toLowerCase().includes(search.toLowerCase())
        );
        setFilteredProducts(filtered);
      }
    }, [search, allProducts]); 
  return (
    <div className="py-6 md:py-20 min-h-screen ">
      <head>
        <title>Search</title>
      </head>
      <h1 className="text-center font-bold text-2xl mb-6 uppercase tracking-tighter">Search Products</h1>
      <div className="w-[95%] md:w-4/5 mx-auto">
        <input
          type="text"
          value={search}
          onChange={(e)=> setSearch(e.target.value)}
          placeholder="Search for products..."
          className="w-full p-4 text-lg border border-gray-300 rounded-lg mb-8 outline-none"
        />
         {filteredProducts.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-8">
            {filteredProducts.map((product) => (
              <Card key={product.id} product={product} />
            ))}
          </div>
        ) : (
          <p className="text-center text-gray-500 text-lg  overflow-hidden">No products found for "{search}"</p>
        )}

      </div>
    </div>
  )
}

export default page