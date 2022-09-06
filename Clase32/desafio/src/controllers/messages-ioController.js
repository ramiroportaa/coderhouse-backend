import messagesModel from "../models/messagesModel.js";
import { normalize, schema } from "normalizr";
import logger from "../logger.js";

//Schemas de Normalize
const authorSchema = new schema.Entity("authorEntity", {}, {idAttribute: "email"});
const messageSchema = new schema.Entity("messageEntity", {author: authorSchema}, {idAttribute: "_id"});
const messageArraySchema = new schema.Entity("messageArrayEntity", {messages: [messageSchema]});

const getNormalizedMessages = async ()=>{
    try {
        //Obtengo array de mensajes de mongo db.
        const messages = await messagesModel.getMessages();
        //Hago una copia del array para eliminar metodos del objeto que me largo mongoose y asi poder trabajarlo con normalizr sin errores.
        const messages2 = JSON.parse(JSON.stringify(messages));
        
        const normalizedData = normalize({id: "messagesArrayId", messages: messages2}, messageArraySchema);
        return normalizedData;
    } catch (error) {
        logger.error(error);
    }
}

const getMessages = async (io, socket) =>{
    try {
        const messagesLog  = await getNormalizedMessages();

        socket.emit("server:messages", messagesLog);
        socket.on("client:newMessage", async (data) => {
            await messagesModel.addMessage(data);
            const messagesLog  = await getNormalizedMessages();
            io.emit("server:messages", messagesLog);
        })
    } catch (error) {
        logger.error(error);
    }
}

export default {getMessages};
