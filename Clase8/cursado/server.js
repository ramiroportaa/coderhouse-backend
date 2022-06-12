const express = require("express");
const app = express();
const router = require("./routes/index")

const server = app.listen(8080, ()=> console.log(`Server listening on port 8080`));
server.on("error", error => console.log("Error en el server" + error));

app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use("public", express.static(`${__dirname}/public`));

app.use("/", router);



