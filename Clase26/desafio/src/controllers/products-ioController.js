import productsModel from "../models/productsModel.js";

const getProducts = async (io, socket) =>{
    const products = await productsModel.getAll();

    socket.emit("server:products", products);
    socket.on("client:newProduct", async (data) => {
        data.price = Number(data.price);
        await productsModel.add(data);
        const products = await productsModel.getAll();
        io.emit("server:products", products);
    })
}

export default {getProducts};
