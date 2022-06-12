const productosService = require("../models/productosModel");

const getAll = (req, res)=>{
    const data = productosService.getAll();
    res.json(data);
}

const getById = (req, res) =>{
    const id = Number(req.params.id);
    const data = productosService.getById(id);
    if (data.error) return res.status(404).json(data);
    res.json(data);
}

const add = (req, res)=>{
    const producto = req.body;
    producto.price = Number(producto.price);
    const data = productosService.add(producto);
    res.json(data);
}

const update = (req, res)=>{
    const id = Number(req.params.id);
    const producto = req.body;
    producto.price = Number(producto.price);
    const data = productosService.update(id,producto);
    if (data.error) return res.status(404).json(data);
    res.sendStatus(200);
}

const deleteById = (req, res)=>{
    const id = Number(req.params.id);
    const data = productosService.deleteById(id);
    if (data.error) return res.status(404).json(data);
    res.sendStatus(200);
}

module.exports = {getAll, getById, add, update, deleteById};