'use client'

import React, { useState } from 'react'

const page = () => {
    const [search,setSearch] = useState("")
  return (
    <div className="py-20 min-h-screen bg-[#F2F0F1] ">
      <h1 className="text-center font-bold text-2xl mb-6 uppercase">Search Products</h1>
      <div className="w-[95%] md:w-4/5 mx-auto">
        <input
          type="text"
          value={search}
          onChange={(e)=> setSearch(e.target.value)}
          placeholder="Search for products..."
          className="w-full p-4 text-lg border border-gray-300 rounded-lg mb-8 outline-none"
        />
       
          <p className="text-center text-gray-500 text-lg overflow-hidden">No products found for "{search}"</p>
      </div>
    </div>
  )
}

export default page