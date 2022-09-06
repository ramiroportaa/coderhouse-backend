import knex from "knex";
import config from "../config.js";
import logger from "../logger.js";

class productsManager {
    constructor(config, table){
        this.table = table;
        this.config = config;

        knex(this.config).schema.hasTable(this.table).then(exists => {
            if (!exists) {
                return knex(this.config).schema.createTable(this.table, table => {
                    table.increments('id').notNullable().primary();
                    table.string('title', 100).notNullable();
                    table.string('thumbnail').notNullable();
                    table.float('price').notNullable();
                  });
            }
        }).catch(err => logger.error("error en constructor de productsManager | " + err))
    }

    async getAll (){
        try {
            const products = await knex(this.config).from(this.table).select('*');
            return {products};
        } catch (error) {
            logger.error("error al obtener productos | " + error);
        } finally{
            knex(this.config).destroy();
        }
    }
    async getById (id){
        try {
            const product = await knex(this.config).from(this.table).where('id', id).select('*');
            return {product};
        } catch (error) {
            logger.error("error al obtener producto | " + error);
        } finally{
            knex(this.config).destroy();
        }
    }
    async add (product){
        try {
            await knex(this.config)(this.table).insert(product);
        } catch (error) {
            logger.error("error al crear producto | " + error);
        } finally{
            knex(this.config).destroy();
        }
    }
    async update (id, newData){
        try {
            await knex(this.config).from(this.table).where('id', id).update(newData);
            return { message : `producto id: ${id} actualizado` };
        } catch (error) {
            logger.error("error al actualizar producto | " + error);
        } finally{
            knex(this.config).destroy();
        }
    }
    async deleteById (id){
        try {
            await knex(this.config).from(this.table).where('id', id).del();
            return { message : `producto id: ${id} eliminado`};
        } catch (error) {
            logger.error("error al borrar producto | " + error);
        } finally{
            knex(this.config).destroy();
        }
    }
}

export default new productsManager(config.CONFIG_MARIADB, 'product');