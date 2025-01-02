"use client";

import { InfiniteMovingCards } from "@/components/ui/infinite-moving-cards";
import { testimonials } from "../../../constant";


export function CustomerReview() {
  return (
    <div className="my-28 overflow-hidden px-6 lg:px-24">
        <h1 className="xl:text-5xl lg:text-4xl md:text-3xl text-2xl tracking-tighter font-bold mb-7">OUR HAPPY CUSTOMERS</h1>
      <InfiniteMovingCards
        items={testimonials}
        direction="right"
        speed="slow"
      />
    </div>
  );
}


