import express from 'express'
import 'dotenv/config'
import connectDb from './config/dbConnect.js'
import authRoutes from './routes/authRoutes.js'
// import userRoutes from './routes/userRoutes.js'
import cors from "cors";
import productRoutes from './routes/productRoutes.js'
import cartRoutes from "./routes/cartRoutes.js";


const app = express()

app.use(express.json())
app.use(cors())


connectDb()


app.use("/uploads", express.static("uploads"));


app.use("/api/products", productRoutes);

app.use('/api/auth', authRoutes)
app.use("/api/cart", cartRoutes);



const PORT = process.env.PORT || 8080
app.listen(PORT, () => {
    console.log(`Server is running at port ${PORT}`)
})