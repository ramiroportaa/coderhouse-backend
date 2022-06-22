const express = require("express");
const app = express();
const path = require("path");
const formRouter = require("./routes/formRouter");
const productsRouter = require("./routes/productsRouter");

app.use(express.json());
app.use(express.urlencoded({extended: true}));

app.set("views", path.join(__dirname, "./views"));
app.set("view engine", "pug");

app.use("/", formRouter);
app.use("/productos", productsRouter);

const PORT = process.env.PORT || 8080;
app.listen(PORT, err =>{
    if (err) return console.log("error en el server: ", err);
    console.log(`Server listening on port: ${PORT}`);
})