'use client'

import { OrderSchema } from "@/lib/schema";
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
  const router = useRouter();
  const {  clearCart } = useShoppingCart();
  const onSubmit = async (values: z.infer<typeof OrderSchema>) => {
    Swal.fire({
        title: "Your order added successfully",
        text: "Thanks for choose Shop.co",
        icon: "success"
        
      });
      clearCart();
      router.push("/");
  };
  
  

  return { form, onSubmit };
}
