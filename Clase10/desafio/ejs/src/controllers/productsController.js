const productsManager = require("../models/productosManager");

const getProducts = (req, res)=>{
    const data = productsManager.getAll();
    res.render("products.ejs", data);
}

const getProduct = (req, res)=>{
    const id = Number(req.params.id);
    const data = productsManager.getById(id);
    if (data.error) return res.status(404).render("product.ejs", data);
    res.status(200).render("product.ejs", data);
}

const createProduct = (req, res)=>{
    const producto = req.body;
    producto.price = Number(producto.price);
    const data = productsManager.add(producto);
    res.render("product.ejs", data);
}

const updateProduct = (req, res)=>{
    const id = Number(req.params.id);
    const producto = req.body;
    producto.price = Number(producto.price);
    const data = productsManager.update(id,producto);
    if (data.error) return res.status(404).send(data);
    res.status(200).send(data);
}

const deleteProduct = (req, res)=>{
    const id = Number(req.params.id);
    const data = productsManager.deleteById(id);
    if (data.error) return res.status(404).json(data);
    res.sendStatus(200);
}

module.exports = {getProducts, getProduct, createProduct, updateProduct, deleteProduct};