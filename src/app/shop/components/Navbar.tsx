'use client'

import { SlidersHorizontal } from 'lucide-react';
import React, { useEffect, useState } from 'react';
import { db } from '../../../../pages/api/dpConfig';
import { Category, Product, ProductCategory } from '../../../../pages/api/schema';
import { getTableColumns } from 'drizzle-orm';
import { CategoryProps, ProductProps } from '../../../../types';
import { desc, eq, lte } from "drizzle-orm";
import Card from '@/app/components/Card';
import { Slider } from '@/components/ui/slider';

const Size = [
  "Small",
  "Medium",
  "Large",
  "X-Large",
];

const Navbar = () => {
  const [allCategory, setAllCategories] = useState<CategoryProps[]>([]);
  const [allProducts, setAllProducts] = useState<ProductProps[]>([]);
  const [filteredProducts, setFilteredProducts] = useState<ProductProps[]>([]);
  const [maxPrice, setMaxPrice] = useState<number>(1000); 
  const [selectedSizes, setSelectedSizes] = useState<string[]>([]);

  useEffect(() => {
    getAllProducts();
    getAllCategory();
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
      setFilteredProducts(result); 
 
    } catch (error) {
      console.error("Error fetching products:", error);
    }
  };

  const getAllCategory = async () => {
    try {
      const result = await db
        .select({
          ...getTableColumns(Category),
        })
        .from(Category);
      setAllCategories(result);
    } catch (error) {
      console.error("Error fetching categories:", error);
    }
  };

  const filterProductsByCategory = async (categoryId: number) => {
    try {
      const result = await db
        .select({
          ...getTableColumns(Product),
        })
        .from(Product)
        .innerJoin(ProductCategory, eq(Product.id, ProductCategory.productId))
        .where(eq(ProductCategory.categoryId, categoryId))
        .orderBy(desc(Product.id));
  
      setFilteredProducts(
        result
          .filter((product) => Number(product.price) <= maxPrice)
          .filter((product) =>
            selectedSizes.length > 0
              ? selectedSizes.some((size) => product.size.includes(size.toLowerCase()))
              : selectedSizes
          )
      );
    } catch (error) {
      console.error("Error filtering products:", error);
    }
  };
  
  const handlePriceChange = (value: number[]) => {
    const selectedMaxPrice = value[0];
    setMaxPrice(selectedMaxPrice);
    setFilteredProducts(
      allProducts
        .filter((product) => Number(product.price) <= selectedMaxPrice)
        .filter((product) =>
          selectedSizes.length > 0
            ? selectedSizes.some((size) => product.size.includes(size.toLowerCase()))
            : selectedSizes
        )
    );
  };
  

  const toggleSize = (size: string) => {
    const newSelectedSizes = selectedSizes.includes(size)
      ? selectedSizes.filter((s) => s !== size)
      : [...selectedSizes, size];
    setSelectedSizes(newSelectedSizes);
    setFilteredProducts(
      allProducts
        .filter((product) => Number(product.price) <= maxPrice)
        .filter((product) =>
            selectedSizes.length > 0
              ? selectedSizes.some((size) => product.size.includes(size))
              : true
          
        )
    );
  };

  return (
    <div className='flex gap-9 '>
      <aside className='w-[295px] border rounded-3xl py-5 px-6 space-y-6 h-full'>
        <div className='flex items-center justify-between pb-5 border-b border-b-[#0000001A]'>
          <h4 className='text-xl font-bold'>Filters</h4>
          <SlidersHorizontal className='text-[#00000066]' />
        </div>
        <div className='space-y-5 pb-5 border-b border-b-[#0000001A]'>
          {allCategory.map((cat, index) => (
            <h3
              key={index}
              className='capitalize cursor-pointer text-base font-normal text-[#00000099] duration-150 transition-all hover:text-[17px] hover:text-[#000000cb]'
              onClick={() => filterProductsByCategory(cat.id)}
            >
              {cat.name}
            </h3>
          ))}
        </div>
        <div className='pb-5 border-b border-b-[#0000001A] mt-5'>
          <div className='text-lg mb-4 font-medium'>
            Max Price:{" "}
            <span className='font-semibold ml-2'>${maxPrice}</span>
          </div>
          <Slider
            defaultValue={[1000]}
            max={1000}
            step={10}
            onValueChange={handlePriceChange}
          />
        </div>
        <div className='space-y-5'>
        <h4 className='text-xl font-bold'>Size</h4>
        <div className='flex flex-wrap gap-2'>
            {Size.map((size) => (
            <button
                key={size}
                className={`py-[10px] px-5  transition-all duration-200 rounded-full ${
                selectedSizes.includes(size)
                    ? "bg-black text-white"
                    : "bg-[#F0F0F0] text-[#00000099]"
                }`}
                onClick={() => toggleSize(size)}
            >
                {size}
        </button>
    ))}
  </div>
</div>

      </aside>
      {filteredProducts.length === 0 ? (
        <p className='flex items-center justify-center w-full'>No items match your filter.</p>
      ) : (
        <div className='grid grid-cols-2 lg:grid-cols-3 gap-4 w-full'>
          {filteredProducts.map((product, index) => (
            <Card key={index} product={product} />
          ))}
        </div>
      )}
    </div>
  );
};

export default Navbar;
