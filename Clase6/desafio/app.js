import express from "express";
import productsController from "./controllers/productsController.js"

const app = express();
const PORT = process.env.PORT || 8080;
const server = app.listen(PORT, ()=>{console.log(`Server listening on port: ${PORT}`)});
server.on("error", error => console.log(`Se produjo un ERROR en el servidor: ${error}`));


app.get("/productos",productsController.getAll)
app.get("/productoRandom",productsController.randomProduct)