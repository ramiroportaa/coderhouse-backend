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

io.on("connection", async (socket) => {
    console.log(`Socket ID: ${socket.id} connected`);

    const products = await productsManager.getAll();
    socket.emit("server:products", products);
    socket.on("client:newProduct", async (data) => {
        data.price = Number(data.price);
        await productsManager.add(data);
        const products = await productsManager.getAll();
        io.emit("server:products", products);
    })

    const messagesLog = await messagesManager.getMessages();
    socket.emit("server:messages", {messagesLog});
    socket.on("client:newMessage", async (data) => {
        await messagesManager.addMessage(data);
        const messagesLog = await messagesManager.getMessages();
        io.emit("server:messages", {messagesLog});
    })
})