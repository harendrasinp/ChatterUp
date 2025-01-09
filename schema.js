import mongoose from "mongoose";

const chatterUpScehma= mongoose.Schema({
    name:String,
    text:String,
    roomId:Number
});

export const chatterModel= new mongoose.model("chatting",chatterUpScehma)