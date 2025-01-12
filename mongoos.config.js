import mongoose from "mongoose";

const url = "mongodb://localhost:27017/chatterUp"

export const ConnectingToDbBymongoos = async () => {
   try{
    await mongoose.connect(url);
    console.log("Connected to MongoDb...")
   }catch(err){
    console.log(err)
   }
}