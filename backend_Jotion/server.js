import express from "express"
import mongoose from "mongoose"
import cors from "cors"
import authRoutes from "./routes/auth.js"
import dotenv from "dotenv"
dotenv.config()

const app = express()
const port = process.env.PORT || 5000

app.use(cors)
app.use(express.json())

mongoose.connect(process.env.MONGO_URI).then(()=>{
    console.log('MongoDB connected')
}).catch(err=>{
    console.log('MongoDB: connection error:',err)
})

app.use('/api/documents',authRoutes)

app.listen(port,()=>{
    console.log(`server is running on port ${port}`)
})
