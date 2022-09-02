import winston from "winston";
import config from "./config.js";

let logger;
if (config.node_env === "production"){
    logger = winston.createLogger({
        transports: [
            new winston.transports.File({filename: "debug.log", level: "debug"}),
            new winston.transports.File({filename: "error.log", level: "error"})
        ]
    })

}else{    
    logger = winston.createLogger({
    transports: [
        new winston.transports.Console({level: "info"})
    ]
})

}

export default logger;