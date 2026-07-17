import { pgTable,serial,text,timestamp,integer } from 'drizzle-orm/pg-core'
import { createRef } from 'react'


export const favoritesTable = pgTable("fevorits",{
    id:serial("id").primaryKey(),
    userId:text("user_ID").notNull(),
    reciopeid:integer("reciope_id").notNull(),
    tital:text("title").notNull(),
    image:text("image"),
    cookTime:text("cook_time"),
    serving:text("servings"),
    createAt:timestamp("create_at").defaultNow(),

 
})




