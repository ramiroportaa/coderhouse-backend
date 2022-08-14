import express from "express";
import { Server as IOServer }  from "socket.io";
import __dirname from "./utils.js";
import session from "express-session";
import mongoStore from "connect-mongo";
import mongoose from "mongoose";
import passport from "passport";

import indexRouter from "./routes/indexRouter.js";
import loginRouter from "./routes/loginRouter.js";
import logoutRouter from "./routes/logoutRouter.js";
import productTestFakerRouter from "./routes/productTestFakerRouter.js";
import registerRouter from "./routes/registerRouter.js";

import productsIoController from "./controllers/products-ioController.js";
import messagesIoController from "./controllers/messages-ioController.js";

import {URLMongo as mongoUrl} from "./options/options.js";

const app = express();

app.use(express.json());
app.use(express.urlencoded({extended: true}));

app.use(express.static(__dirname+"/public"));

const PORT = process.env.PORT || 8080;
const serverExpress = app.listen(PORT, (err)=> err ? console.log(`Error en el server: ${err}`) : console.log(`Server listening on PORT: ${PORT}`));
const io = new IOServer(serverExpress);

//Config de motor EJS
app.set("views", __dirname + "/views");
app.set("view engine", ".ejs");

//Conectamos mongoose.
mongoose.connect(mongoUrl, (err, res)=>{
    if (err) throw err;
    return console.log("Base de datos MONGO conectada.");
})

//Config de sessions almacenadas en mongo ATLAS.
const mongoOptions = {useNewUrlParser: true, useUnifiedTopology: true};
app.use(session({
    store: mongoStore.create({mongoUrl, mongoOptions}),
    secret: "secretox",
    resave: false,
    saveUninitialized: false,
    rolling: true,
    cookie:{
        maxAge: 600000
    }
}));

//Inicializacion de passport
app.use(passport.initialize());
app.use(passport.session());

app.use("/", indexRouter);
app.use("/register", registerRouter);
app.use("/login", loginRouter);
app.use("/logout", logoutRouter);
//Ruta de testeo con Faker.js
app.use("/api/productos-test", productTestFakerRouter);

//Conexion websockets
io.on("connection", async (socket) => {
    console.log(`Socket ID: ${socket.id} connected`);

    await productsIoController.getProducts(io, socket);
    await messagesIoController.getMessages(io, socket);
})