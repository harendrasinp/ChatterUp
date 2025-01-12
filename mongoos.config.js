import mongoose from "mongoose";

const url = "mongodb+srv://haren111990:rHJVZla6UpbWTBed@cluster0.i5lsy.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0"

export const ConnectingToDbBymongoos = async () => {
   try{
    await mongoose.connect(url);
    console.log("Connected to MongoDb...")
   }catch(err){
    console.log(err)
   }
}