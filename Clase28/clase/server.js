import express from "express";
import config from "./config.js";
//import {sumar} from "./calculo.js";
import {fork} from "child_process";

const app = express();
app.listen(config.PORT, config.HOST, ()=>{console.log(`Server listening on: http://${config.HOST}:${config.PORT}`)});

let visitas = 0;

app.get("/", (req, res)=>{
    visitas++;
    res.send(`Has visitado la ruta ${visitas} veces`);
})

app.get("/calculo-bloq", (req, res)=>{
    const suma = sumar();
    console.log("Suma bloqueante terminada");
    res.send(`Resultado de la suma: ${suma}`);
})

app.get("/calculo-nobloq", (req, res)=>{
    const forked = fork("./calculo.js");
    forked.on("message", (msg)=>{
        if (msg === "listo"){
            forked.send("noImportaQuePongaAca");
        }else{
            const suma = msg;
            console.log("Suma NO bloqueante terminada");
            res.send(`Resultado de la suma: ${suma}`);
        }
    })
})