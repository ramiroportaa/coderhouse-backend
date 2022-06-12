import express from "express";

const app = express();
const PORT = process.env.PORT || 8080;
const server = app.listen(PORT, ()=> console.log(`Server listening on PORT: ${PORT}`));
server.on("error", error => console.log(`Se produjo un ERROR en el servidor: ${error}`));

const productos = [
    {
      "title": "Escuadra",
      "price": 123.45,
      "thumbnail": "https://cdn3.iconfinder.com/data/icons/education-209/64/ruler-triangle-stationary-school-256.png",
      "id": 1
    },
    {
      "title": "Calculadora",
      "price": 234.56,
      "thumbnail": "https://cdn3.iconfinder.com/data/icons/education-209/64/calculator-math-tool-school-256.png",
      "id": 2
    },
    {
      "title": "Globo Terráqueo",
      "price": 345.67,
      "thumbnail": "https://cdn3.iconfinder.com/data/icons/education-209/64/globe-earth-geograhy-planet-school-256.png",
      "id": 3
    }
   ]
   
app.get("/api/productos", (req, res) =>{
    res.json(productos);
})

app.get("/api/productos/:num", (req, res) =>{
    const num = Number(req.params.num);
    const producto = productos.filter(prod => prod.id === num);
    res.json(producto[0]);
})

