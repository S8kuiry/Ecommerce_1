

import express from  'express'
import cors from 'cors'
import dotenv from 'dotenv'
import connectDb from './config/db.js'
import connectCloudinary from './config/cloudinary.js'
import userRouter from './routes/userRoutes.js'
import productRouter from './routes/productRoutes.js'
import cartRouter from './routes/cartRouter.js'
import orderRouter from './routes/orderRouter.js'

const app = express()
dotenv.config()

// miidleware 
app.use(cors())
app.use(express.json())
const port  = process.env.port

//config connection
connectDb()
connectCloudinary()

//routes
app.use('/api/user',userRouter)
app.use('/api/product',productRouter)
app.use('/api/cart',cartRouter)
app.use('/api/order',orderRouter)

//listening
app.use('/',(req,res)=>{
    res.send("Hello Ecommerce Working")
})
app.listen(port,()=>{
    console.log("Server successfully running on port "+port)
})




