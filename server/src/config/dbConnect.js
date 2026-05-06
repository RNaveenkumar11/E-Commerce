import mongoose from 'mongoose'

const connectDb = async() =>{
        try{
            await mongoose.connect("mongodb://localhost:27017/auth")
            console.log("Connected to DB")
        }catch{
             console.log("Error connecting to DB")
        }
    }

export default connectDb