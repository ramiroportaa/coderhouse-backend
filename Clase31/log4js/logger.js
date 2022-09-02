import log4js from "log4js";
import config from "./config.js";

log4js.configure({
    appenders:{
        loggerConsole: {type: "console"},
        FileDebug: {type: "file", filename: "debug.log"},
        FileError: {type: "file", filename: "errores.log"},
        loggerFileDebug: {type: "logLevelFilter", appender: "FileDebug", level: "debug"},
        loggerFileError: {type: "logLevelFilter", appender: "FileError", level: "error"}
    },
    categories:{
        default: {appenders: ["loggerConsole"], level: "info"},
        produccion: {appenders: ["loggerFileDebug", "loggerFileError"], level: "all"}
    }
})

const logger = (config.node_env === "production") ? log4js.getLogger("produccion") : log4js.getLogger();

export default logger;