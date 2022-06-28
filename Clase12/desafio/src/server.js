import express from "express";
import { Server as IOServer }  from "socket.io";
import __dirname from "./utils.js";
import productsManager from "./services/productsManager.js";
import messagesManager from "./services/messagesManager.js";

const app = express();

const PORT = process.env.PORT || 8080;
const serverExpress = app.listen(PORT, (err)=> err ? console.log(`Error en el server: ${err}`) : console.log(`Server listening on PORT: ${PORT}`));

const io = new IOServer(serverExpress);

app.use(express.static(__dirname+"/public"));

io.on("connection", (socket)=>{
    console.log(`Socket ID: ${socket.id} connected`);
    socket.emit("server:products", productsManager.getAll());
    socket.on("client:newProduct", (data)=>{
        data.price = Number(data.price);
        productsManager.add(data);
        io.emit("server:products", productsManager.getAll());
    })
    socket.emit("server:messages", {messagesLog: messagesManager.getMessages()});
    socket.on("client:newMessage", (data)=>{
        messagesManager.addMessage(data);
        io.emit("server:messages", {messagesLog: messagesManager.getMessages()});
    })
})