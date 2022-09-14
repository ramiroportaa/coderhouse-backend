import __dirname from "../utils.js";
import mongoose from "mongoose";
import logger from "../logger.js";

//Clase contenedora de MongoDB para productos.
class productsManager {
    constructor(collectionName){
        const productSchema = mongoose.Schema({
            title: {type: String, require: true},
            thumbnail: {type: String, require: true},
            price: {type: Number, require: true}
        });
        this.model = mongoose.model(collectionName, productSchema);
    }

    async getAll (){
        try {
            const products = await this.model.find();
            return {products};
        } catch (error) {
            logger.error("error al obtener productos | " + error);
        }
    }
    async getById (id){
        try {
            const product = await this.model.findById(id);
            return {product};
        } catch (error) {
            logger.error("error al obtener producto | " + error);
        }
    }
    async add (product){
        try {
            await this.model.create(product);
        } catch (error) {
            logger.error("error al crear producto | " + error);
        }
    }
    async update (id, newData){
        try {
            await this.model.updateOne({_id: id}, newData);
            return { message : `producto id: ${id} actualizado` };
        } catch (error) {
            logger.error("error al actualizar producto | " + error);
        }
    }
    async deleteById (id){
        try {
            await this.model.deleteOne({_id: id});
            return { message : `producto id: ${id} eliminado`};
        } catch (error) {
            logger.error("error al borrar producto | " + error);
        }
    }
}

export default new productsManager('product');