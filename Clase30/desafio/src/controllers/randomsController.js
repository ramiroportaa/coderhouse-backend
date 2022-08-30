import __dirname from "../utils.js";
import {fork} from "child_process";
import config from "../config.js";

const randomsController = (req, res)=>{
    const cant = Number(req.query.cant) || 100000000;
    const forked = fork(__dirname + "/controllers/randomGenerator.js");
    forked.on("message", (msg)=>{
        if (msg == "listo"){
            forked.send(cant);
        }else{
            console.log(`Random generado en PORT: ${config.PORT} || PID: ${process.pid}`);
            res.json({port: config.PORT, PID: process.pid, msg});
        }
    });
}

export default randomsController;