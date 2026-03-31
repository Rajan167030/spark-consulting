import mongoose from "mongoose";
import dotenv from 'dotenv';
dotenv.config();
 export const Connectdb = async(req,res)=>{
  try {
    mongoose.connect(process.env.MONGO_URL);
    console.log('database connected');
  } catch (error) {
    res.status(500);
    console.log('error in mongoDB connection');
  }
}
