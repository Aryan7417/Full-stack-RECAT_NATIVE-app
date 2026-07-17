import express from 'express'
import { ENV } from "./config/env.js"
import { db } from './config/db.js';
import { favoritesTable } from './db/schema.js';
import { and, eq } from 'drizzle-orm';

const app = express()
const PORT = ENV.PORT || 8001;


app.get('/', (req, res) => {
    res.status(200)
        .json({ success: true })
})

app.use(express.json())

app.post('/api/favorites', async (req, res) => {
    try {
        const { userId, reciopeid, tital, image, cookTime, serving, } = req.body

        if (!userId || !reciopeid || !tital) {
            return res.status(400).json({ error: "Missing requed fields" })
        }

        await db.insert(favoritesTable)

        const newFavorite = await db
            .insert(favoritesTable).values({
                userId,
                reciopeid,
                tital,
                image,
                cookTime,
                serving
            })
            .returning()

        res.status(201).json(newFavorite[0])

    } catch (error) {
        console.log("Error is favrite ", error)
        res.status(500).json({ error: "some want wront " })

    }
})




app.delete("/api/favorites/:userId/:reciopeid", async (req, res) => {
    try {
        const { userId, reciopeid } = req.params
        await db.delete(favoritesTable).where(
            and(
                eq(favoritesTable.userId, parseInt(userId)),
                eq(favoritesTable.reciopeid, parseInt(reciopeid))
            )
        );

        res.status(200).json({ message: "favorrite revmove Successfully" })



    }
    catch (error) {
        console.log("Error removing a favorite", error)
        res.status(500).json({ error: "Something is wrong" })
    }
}
)



app.get("/api/favorites/:userId",async (req,res)=>{
    try {
        const {userId}=req.params
        

        const userfavorate = await db
        .select()
        .from(favoritesTable)
        .where(eq(favoritesTable.userId,userId))

        res.status(200).json(userfavorate)
        
    } catch (error) {
        console.log("Error fetching the favrotes ",error)
        res.status(500).json({error:"something wwent wrong"})
        
    }
} ) 









app.listen(PORT, () => {
    console.log("server isa running PORT 5001")
})




console.log("hello workd")