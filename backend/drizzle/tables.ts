import { integer, pgEnum, pgTable, text, timestamp, uuid } from "drizzle-orm/pg-core";


export const categoryEnum = pgEnum('categoryEnum', ['entertainment', 'myLife', 'technology', 'fashion', 'travel', 'games', 'jobs', 'others']);

export const postsTable = pgTable('postsTable', {

    id: uuid('id').primaryKey().defaultRandom(),

    title: text('title').notNull(),

    description: text('description').notNull(),

    imageUrl: text('imageUrl'),
    readTimeMints: integer('readTimeMints').notNull(),

    category: categoryEnum('category').notNull().default('others'),

    tags: text('tags').array().notNull().default([]),
    created_at: timestamp('created_at').defaultNow().notNull(),
    updated_at: timestamp('updated_at').defaultNow().notNull(),

})