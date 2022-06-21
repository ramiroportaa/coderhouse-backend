const express = require("express");
const app = express();
const path = require("path");
const {engine} = require("express-handlebars");
const productsRouter = require("./routes/productsRouter");
const formRouter = require("./routes/formRouter");

app.use(express.json());
app.use(express.urlencoded({extended: true}));

app.engine("hbs", engine({
    extname: ".hbs",
    defaultLayout: "index.hbs",
    layoutsDir: path.join(__dirname, "./views/layouts"),
    partialsDir: path.join(__dirname, "./views/partials")
}))

app.set("views", path.join(__dirname, "./views"));
app.set("view engine", ".hbs");

app.use('/', formRouter);
app.use('/productos', productsRouter);

const PORT = process.env.PORT || 8080;
app.listen(PORT, (err) => {
    if (err) return console.log(`Error en el server: ${err}`);
    console.log(`Server listening on PORT: ${PORT}`);
})
