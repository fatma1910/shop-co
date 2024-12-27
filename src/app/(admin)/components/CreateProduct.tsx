'use client'

import { useEffect, useState } from "react"
import { db } from "../../../../pages/api/dpConfig"
import { getTableColumns } from "drizzle-orm"
import { Category } from "../../../../pages/api/schema"
import Select from "react-select";
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
import UseProduct from "../../../../hooks/use-product-form"


const CreateProduct = () => {
    const [getCategories, setGetCategories] = useState<{ value: any; label: any }[]>([])
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
              .from(Category)
              const formattedCategories = result.map((category: any) => ({
                value: category.id,  
                label: category.name, 
              }));
          
              setGetCategories(formattedCategories);
          } catch (error) {
            console.error("Error fetching category:", error);
          }
    }

    const handleChange = (selectedOptions: any) => {
      console.log(selectedOptions);
    }
  return (
    <div className="my-14 mx-11">
        <h2 className="font-semibold text-[24px]">Product Details</h2>
        <div className="p-6 rounded-3xl border shadow-md my-5">
        <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8 ">
        <div className="space-y-8  grid grid-cols-1 md:grid-cols-2 md:gap-x-6">
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
          onChange={(selectedOptions) => {
            form.setValue(
              "categories",
              selectedOptions.map((option) => option.value)
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
                    <Input type={"number"} placeholder="50$"  />
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
                  <Select
                    options={[
                      { value: "small", label: "Small" },
                      { value: "medium", label: "Medium" },
                      { value: "large", label: "Large" },
                    ]}
                    placeholder="Choose a size..."
                    isClearable
                    onChange={handleChange}
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
                    <Input type="file" accept="image/*" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
        </div>
        
        <Button type="submit" >Submit</Button>
      </form>
    </Form>
      </div>
    </div>
  )
}

export default CreateProduct