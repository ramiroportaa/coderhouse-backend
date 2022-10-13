import __dirname from "../dirname.js";
import logger from "../utils/logger.js";

const getRegister = (req, res)=>{
    try {
        res.sendFile(__dirname + "/views/register.html");
    } catch (error) {
        logger.error(error);
    }
}

export default {
    getRegister
}