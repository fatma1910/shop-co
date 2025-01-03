import {  integer, numeric, pgTable, serial, text, varchar } from "drizzle-orm/pg-core"; 


export const Product = pgTable ("product",{
    id: serial("id").primaryKey(),
    title: varchar("title").notNull(),
    rate: numeric('rate', { precision: 5, scale: 2 }).notNull(),
    price: numeric('price').notNull(),
    color:varchar("color").notNull(),
    size: varchar("size").array().notNull(),
    description: varchar("description").notNull(),
    imagePublicId: varchar('image_public_id', { length: 255 }), 
    imageUrl: text('image_url').notNull(),
} )

export const Review = pgTable ('review',{
    id: serial('id').primaryKey(),
    name: varchar('name').notNull(),
    rate: numeric('rate', { precision: 5, scale: 2 }).notNull(),
    review: varchar('review').notNull(),
    productId: integer('productId').references(()=>Product.id),
} )

export const Category = pgTable("category", {
    id: serial("id").primaryKey(),
    name: varchar("name").notNull().unique(),
});


export const ProductCategory = pgTable("product_category", {
    id: serial("id").primaryKey(),
    productId: integer('product_id')
        .references(() => Product.id)
        .notNull(),
    categoryId: integer('category_id')
        .references(() => Category.id)
        .notNull(),
});