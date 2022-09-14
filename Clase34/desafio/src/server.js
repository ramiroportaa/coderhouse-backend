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
import registerRouter from "./routes/registerRouter.js";
import infoProcessRouter from "./routes/infoProcessRouter.js";
import randomsRouter from "./routes/randomsRouter.js";

import productsIoController from "./controllers/products-ioController.js";
import messagesIoController from "./controllers/messages-ioController.js";

import config from "./config.js";

import cluster from "cluster";
import os from "os";

import logger from "./logger.js"

const app = express();

const isCluster = config.MODO == "CLUSTER";
const numCpus = os.cpus().length;

if (isCluster && cluster.isPrimary) {
    for (let index = 0; index < numCpus; index++) {
        cluster.fork();
    }

    cluster.on("exit", (worker)=>{
        logger.info(`worker ${worker.process.pid} died :(`);
        cluster.fork();
    })
    
}else{
    app.use(express.json());
    app.use(express.urlencoded({extended: true}));

    app.use(express.static(__dirname+"/public"));

    const PORT = config.PORT;
    const serverExpress = app.listen(PORT, (err)=> err ? logger.error(`Error en el server: ${err}`) : logger.info(`Server listening on: http://${config.HOST}:${config.PORT} || PID: ${process.pid}`));
    const io = new IOServer(serverExpress);

    //Config de motor EJS
    app.set("views", __dirname + "/views");
    app.set("view engine", ".ejs");

    //Conectamos mongoose.
    mongoose.connect(config.MONGO_URL, (err, res)=>{
        if (err){
            logger.error(err);
            throw err;
        };
        return logger.info("Base de datos MONGO conectada.");
    })

    //Config de sessions almacenadas en mongo ATLAS.
    const mongoOptions = {useNewUrlParser: true, useUnifiedTopology: true};
    app.use(session({
        store: mongoStore.create({mongoUrl: config.MONGO_URL, mongoOptions}),
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

    //Middleware para registrar todas las peticiones en el logger.
    app.use((req, res, next)=>{
        logger.info(`Petición recibida | Ruta: ${req.url} - Método: ${req.method}`);
        next();
    });    

    app.use("/", indexRouter);
    app.use("/register", registerRouter);
    app.use("/login", loginRouter);
    app.use("/logout", logoutRouter);

    //Ruta informativa del process (clase 28).
    app.use("/info", infoProcessRouter);
    //Ruta para testear child process (clase 28).
    app.use("/api/randoms", randomsRouter);

    //Middleware para registrar todas las peticiones a rutas no implementadas.
    app.get("*", (req, res)=>{
        logger.warn(`Ruta: ${req.url} Método: ${req.method} NO implementada`);
        res.status(404).send(`Ruta: ${req.url} Método: ${req.method} NO implementada`);
    })

    //Conexion websockets
    io.on("connection", async (socket) => {
        logger.info(`Socket ID: ${socket.id} connected`);

        await productsIoController.getProducts(io, socket);
        await messagesIoController.getMessages(io, socket);
    })
}