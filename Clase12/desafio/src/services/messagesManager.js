import fs from "fs";
import __dirname from "../utils.js";

class messagesManager {
    constructor(){
        this.messagesLog = [];
        this.route = `${__dirname}/db/messagesLog.json`;
    }
    addMessage(data){
        const read = fs.readFileSync(this.route, "utf-8") || "[]";
        const readJSON = JSON.parse(read);
        this.messagesLog = readJSON;

        const date = new Date().toLocaleString();
        data.date = date;
        this.messagesLog.push(data);

        fs.writeFileSync(this.route, JSON.stringify(this.messagesLog,null,2));
    }
    getMessages(){
        const read = fs.readFileSync(this.route, "utf-8") || "[]";
        const readJSON = JSON.parse(read);
        this.messagesLog = readJSON;
        return this.messagesLog;
    }
}

export default new messagesManager();