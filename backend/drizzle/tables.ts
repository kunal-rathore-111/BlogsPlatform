import { integer, pgEnum, pgTable, text, timestamp, uuid, varchar } from "drizzle-orm/pg-core";


export const categoryEnum = pgEnum('categoryEnum', ['Entertainment', 'myLife', 'Technology', 'Fashion', 'Travel', 'Games', 'Jobs', 'Others']);

export const postsTable = pgTable('postsTable', {

    id: uuid('id').primaryKey().defaultRandom(),

    title: text('title').notNull(),

    description: text('description'),

    fullDetail: text('fullDetail').notNull(),

    imageUrl: text('imageUrl'),
    readTimeMints: integer('readTimeMints').notNull(),

    category: categoryEnum('category').notNull().default('Others'),
    author: varchar('author', { length: 100 }).notNull().default("unknown"),

    tags: text('tags').array().notNull().default([]),
    created_at: timestamp('created_at').defaultNow().notNull(),
    updated_at: timestamp('updated_at').defaultNow().notNull(),

})

