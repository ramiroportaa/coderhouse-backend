const express = require("express");
const app = express();
const productosRouter = require("./routes/productosRouter");

//Configuracion express para uso de json.
app.use(express.json());
app.use(express.urlencoded({extended: true}));

//Espacio publico (para front desde el back).
app.use(express.static(`${__dirname}/public`));

//Rutas.
app.use("/api/productos", productosRouter);

//Inicializacion del server.
const PORT = process.env.PORT || 8080;
const server = app.listen(PORT, ()=>{console.log(`Server listening on port: ${PORT}`)});
server.on("error", error => console.log(`Ocurrio un error en el servidor: ${error}`));