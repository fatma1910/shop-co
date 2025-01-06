'use client'

import { SlidersHorizontal } from 'lucide-react';
import React, { useEffect, useState } from 'react';
import { getTableColumns } from 'drizzle-orm';

import { desc, eq } from "drizzle-orm";
import Card from '@/app/components/Card';
import { Slider } from '@/components/ui/slider';
import { db } from '../../../../pages/api/dpConfig';
import { Category, Product, ProductCategory } from '../../../../pages/api/schema';
import { CategoryProps, ProductData, ProductProps } from '../../../../types';


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
    const [productsCategory, setProductsCategory] = useState<ProductData[]>([]);
    const [maxPrice, setMaxPrice] = useState<number>(700); 
    const [selectedSizes, setSelectedSizes] = useState<string>("");
    const [category, setCategory] = useState("all");

    useEffect(() => {
        getAllProducts();
        getAllCategory();
    }, []);

    useEffect(() => {
        getProductsCategory();
    }, [category]);

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

    const getProductsCategory = async () => {
            try {
                const result = await db
                    .select()
                    .from(Product)
                    .innerJoin(ProductCategory,eq(ProductCategory.productId,Product.id) )
                    .innerJoin(Category,eq(Category.id,ProductCategory.categoryId) )
                    .where(eq(Category.name,category.toLowerCase()) );
                
                    setProductsCategory(result)
                } catch (error) {
                    console.error("Error fetching products:", error);
                }
            
        };

        useEffect(() => {
            getFilteredProducts()
        }, [category,productsCategory,maxPrice,selectedSizes,allProducts]);

        const getFilteredProducts = () => {
            
            const filtered = allProducts.filter((product) => {
              const categoryMatch =
                category === "all" || productsCategory.some((pc) => pc.product.id === product.id);
              const priceMatch = Number(product.price) <= maxPrice;
              const sizeMatch =
                selectedSizes === "" || product.size.includes(selectedSizes.toLowerCase());
          
              return categoryMatch && priceMatch && sizeMatch;
            });
          
            setFilteredProducts(filtered);
          };
          

  return (
    <div className='flex gap-9 '>
      <aside className='w-[295px] border rounded-3xl py-5 px-6 space-y-6 h-full'>
        <div className='flex items-center justify-between pb-5 border-b border-b-[#0000001A]'>
          <h4 className='text-xl font-bold'>Filters</h4>
          <button onClick={()=> setCategory("all")}>
            <SlidersHorizontal  className='text-[#00000066]' />
          </button>
          
        </div>
        <div className='space-y-5 pb-5 border-b border-b-[#0000001A]'>
          {allCategory.map((cat, index) => (
            <h3
              key={index}
              className={`'capitalize cursor-pointer text-base font-normal ${category===cat.name ? 'text-black':'text-[#00000099]'}  duration-150 transition-all hover:text-[17px] hover:text-[#000000cb]'`}
              onClick={() => setCategory(cat.name)}
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
            defaultValue={[700]}
            max={1000}
            step={10}
            onValueChange={(val) => setMaxPrice(val[0])}
          />
        </div>
        <div className='space-y-5'>
        <h4 className='text-xl font-bold'>Size</h4>
        <div className='flex flex-wrap gap-2'>
            {Size.map((size) => (
            <button
                key={size}
                className={`py-[10px] px-5  transition-all duration-200 rounded-full ${
                  selectedSizes === size
                    ? "bg-black text-white"
                    : "bg-[#F0F0F0] text-[#00000099]"
                }`}
                onClick={() => setSelectedSizes(size)}
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
