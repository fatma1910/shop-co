'use client'

import { useEffect, useState } from "react"
import { db } from "../../../../pages/api/dpConfig"
import { getTableColumns } from "drizzle-orm"
import { Category } from "../../../../pages/api/schema"
import Select, { MultiValue, SingleValue } from "react-select";
import { Button } from "@/components/ui/button"
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import UseProduct from "@/hooks/use-product-form"




type SizeOption = {
  value: string;
  label: string;
};

const sizeOptions: SizeOption[] = [
  { value: "small", label: "Small" },
  { value: "medium", label: "Medium" },
  { value: "large", label: "Large" },
  { value: "x-large", label: "X-Large" },
];

const CreateProduct = () => {
  const [getCategories, setGetCategories] = useState<{ value: any; label: any }[]>([]);
  const [isLoading, setIsLoading] = useState(false); 
  const { form, onSubmit } = UseProduct();

  useEffect(() => {
    getAllCategories();
  }, []);


  const getAllCategories = async () => {
    try {
      const result = await db
        .select({
          ...getTableColumns(Category),
        })
        .from(Category);
      const formattedCategories = result.map((category: any) => ({
        value: category.id,
        label: category.name,
      }));

      setGetCategories(formattedCategories);
    } catch (error) {
      console.error("Error fetching category:", error);
    }
  };

  const handleSubmit = async (data: any) => {
    setIsLoading(true); 
    try {
      
      await onSubmit(data); 
      
      setIsLoading(false); 
      
      
    } catch (error) {
      console.error("Error creating product:", error);
      setIsLoading(false); 
    }
    form.reset();
    
  };

  return (
    <div className="my-14 mx-11">
      <h2 className="font-semibold text-[24px] ">Product Details</h2>
      <div className="p-6 rounded-3xl border shadow-md my-5">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-8">
            <div className="space-y-8 grid grid-cols-1 md:grid-cols-2 md:gap-x-6">
              <FormField
                control={form.control}
                name="title"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Product title</FormLabel>
                    <FormControl>
                      <Input placeholder="skirt..." {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <Select
                options={getCategories}
                isMulti
                onChange={(selectedOptions: any) => {
                  form.setValue(
                    "categories",
                    selectedOptions.map((option: any) => option.value)
                  );
                }}
                placeholder="Choose categories..."
                required
              />

              <FormField
                control={form.control}
                name="description"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Description</FormLabel>
                    <FormControl>
                      <Input placeholder="Product Description..." {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="color"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Color</FormLabel>
                    <FormControl>
                      <Input placeholder="Red.." {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="price"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Price</FormLabel>
                    <FormControl>
                      <Input
                        type={"number"}
                        placeholder="50$"
                        {...field}
                        onChange={(e) => field.onChange(e.target.value ? parseFloat(e.target.value) : "")}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="size"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Size</FormLabel>
                    <FormControl>
                      <Select<SizeOption, true>
                        isMulti
                        options={sizeOptions}
                        placeholder="Choose sizes..."
                        onChange={(selectedOptions: MultiValue<SizeOption>) =>
                          form.setValue("size", 
                            // @ts-ignore
                            selectedOptions.map(option => option.value)) 
                        }
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />


              <FormField
                control={form.control}
                name="image"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Image</FormLabel>
                    <FormControl>
                    <Input
                        onChange={(e) => field.onChange(e.target.files ? e.target.files[0] : null)}
                        ref={field.ref}
                        name={field.name}
                        type="file"
                        accept="image/*"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <Button type="submit" disabled={isLoading}>
              {isLoading ? "Submitting..." : "Submit"}
            </Button>
          </form>
        </Form>
      </div>
    </div>
  );
};

export default CreateProduct;
