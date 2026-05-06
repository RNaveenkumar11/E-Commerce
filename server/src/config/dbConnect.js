import mongoose from 'mongoose'

const connectDb = async() =>{
        try{
            await mongoose.connect(process.env.MONGO_URL)
            console.log("Connected to DB")
        }catch{
             console.log("Error connecting to DB")
        }
    }

export default connectDb
