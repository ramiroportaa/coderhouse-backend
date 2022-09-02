import pino from "pino";
import config from "./config.js";

let logger;

if (config.node_env === "production"){
    logger = pino(pino.destination("debug.log"));
    logger.level = "debug";

}else{  
    logger = pino();  
    logger.level = "info";
}

export default logger;