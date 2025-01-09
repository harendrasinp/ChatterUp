import express from "express";
import { Server } from "socket.io";
import cors from "cors";
import htpp from "http";
import { ConnectingToDbBymongoos } from "./mongoos.config.js";
import { chatterModel } from "./schema.js";
const app = express();

const server = htpp.createServer(app);

const io = new Server(server, {
    cors: {
        origin: "*",
        methods: ["GET", "POST"]
    }
});
io.on("connection", (socket) => {
// --------------------------------------connect-----------------------------------------------------------------
    console.log("Connected.");
    // -----------resgitration-message----------
    socket.on("user-detail",async(data)=>{
        const roomid=data.roomid;
        socket.join(roomid);
        const prevText=await chatterModel.find({roomId:roomid});
        socket.emit("previ-messages",prevText)
        socket.broadcast.to(data.roomid).emit("join-message",data);
    });
    
    socket.on("start-typing",(data)=>{
        socket.join(data.roomid);
        socket.broadcast.to(data.roomid).emit("start",data);
    });
    socket.on("stop-typing",(data)=>{
        socket.join(data.roomid);
        socket.broadcast.to(data.roomid).emit("stop",data);
    });
    // ---------------chatting---------------------
   socket.on("text-message",async(data)=>{
    const chatData=new chatterModel({
        name:data.username,
        text:data.textValue,
        roomId:data.roomid,
    });
    await chatData.save();
    socket.join(data.roomid);
    io.to(data.roomid).emit("textdata",data);
   });
// -------------------------------------disconnect----------------------------------------------------------------
    socket.on("disconnect", () => {
        console.log("Disconnected.");
    })
})
server.listen(3000, () => {
    console.log("Server Listening on Port 3000,")
    ConnectingToDbBymongoos();
})