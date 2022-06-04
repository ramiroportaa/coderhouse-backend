import Contenedor from "./contenedor.js";

const productos = new Contenedor("productos");

async function randomProduct (req, res){
    const data = await productos.getAll();
    const random = Math.floor(Math.random() * data.length);
    res.send(data[random]);
}
async function getAll (req, res){
    const data = await productos.getAll();
    res.send(data);
}

export default {
    randomProduct,
    getAll
}