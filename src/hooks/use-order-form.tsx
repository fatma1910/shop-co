'use client'

import { OrderSchema } from "@/lib/schema";
import { useUser } from "@clerk/nextjs";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import Swal from "sweetalert2";
import { useShoppingCart } from "use-shopping-cart";
import { z } from "zod";


export default function UseOrder() {
  const form = useForm<z.infer<typeof OrderSchema>>({
    resolver: zodResolver(OrderSchema),
    defaultValues: {
      name:'',
      email: '',
      phone: '',
      street:'',
      city: '',
    },
  });
  const { user } = useUser();
  const router = useRouter();
  const {  clearCart , cartDetails ,totalPrice} = useShoppingCart();
  const onSubmit = async (values: z.infer<typeof OrderSchema>) => {
    try {
      const response = await fetch("/api/Order", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...values, products: cartDetails, createdBy: user?.primaryEmailAddress?.emailAddress , total:totalPrice  }), 
      });
      console.log(user?.primaryEmailAddress?.emailAddress )

      if (!response.ok) {
        throw new Error("Failed to place order");
      }

      Swal.fire({
        title: "Your order was added successfully",
        text: "Thanks for choosing Shop.co",
        icon: "success",
      });

      clearCart();
      router.push("/orders");
      clearCart();
    } catch (error) {
      console.error("Error submitting order:", error);
      Swal.fire({
        title: "Error",
        text: "Failed to place order. Please try again.",
        icon: "error",
      });
    }
  };
  

  return { form, onSubmit };
}
