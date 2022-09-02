import config from "./config.js";
import express from "express";
import logger from "./logger.js"

const app = express();

app.get("/sumar", (req, res)=>{
    const num1 = req.query.num1;
    const num2 = req.query.num2;
    let suma = 0;
    if (isNaN(num1) || isNaN(num2)){
        logger.error("numeros invalidos");
        return res.send("error de numeros invalidos");
    }
    suma = Number(num1) + Number(num2);
    logger.info("operación exitosa");
    res.send(`La suma de ${num1} + ${num2} es ${suma}`);
})

app.get("*", (req, res)=>{
    logger.warn("petición a recurso invalido");
    res.status(404).send("Recurso invalido");
})

const server = app.listen(config.port, ()=>{console.log(`Server listening on http://localhost:${config.port}`)});
server.on("error", (err)=> logger.error(`Error al iniciar el server: ${err}`));