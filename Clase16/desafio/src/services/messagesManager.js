import __dirname from "../utils.js";
import knex from "knex";
import {configSqlite} from "../options/options.js";

export class messagesManager {
    constructor(config, table){
        this.table = table;
        this.config = config;

        knex(this.config).schema.hasTable(this.table).then(exists => {
            if (!exists) {
                return knex(this.config).schema.createTable(this.table, table => {
                    table.increments('id').notNullable().primary();
                    table.string('email', 70).notNullable();
                    table.string('message').notNullable();
                    table.string('date', 50).notNullable();
                  });
            }
        }).catch(err => console.log("error en constructor", err))
    }

    async addMessage(data){
        try {
            const date = new Date().toLocaleString();
            data.date = date;
    
            await knex(this.config)(this.table).insert(data);
        } catch (error) {
            console.log("error al añadir mensaje", error);
        } finally{
            knex(this.config).destroy();
        }
    }

    async getMessages(){
        try {
            const data = await knex(this.config).from(this.table).select('*');
            return data; 
        } catch (error) {
            console.log("error al obtener mensajes", error);
        } finally{
            knex(this.config).destroy();
        }
    }
}

export default new messagesManager(configSqlite, 'message');