import express from 'express'
import {ENV} from"./config/env.js"

const app = express()
const PORT = ENV.PORT||8001;


app.get('/',(req,res)=>{
    res.status(200)
    .json({success:true})
})




app.listen(PORT,()=>{
    console.log("server isa running PORT 5001")
})