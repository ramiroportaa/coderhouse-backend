import productsModel from "../models/productsModel.js";
import logger from "../logger.js";

const getProducts = async (io, socket) =>{
    try {
        const products = await productsModel.getAll();
        console.log(products);

        socket.emit("server:products", products);
        socket.on("client:newProduct", async (data) => {
            data.price = Number(data.price);
            await productsModel.add(data);
            logger.info("Producto creado con éxito");
            const products = await productsModel.getAll();
            io.emit("server:products", products);
        })        
    } catch (error) {
        logger.error(error);
    }
}

export default {getProducts};
