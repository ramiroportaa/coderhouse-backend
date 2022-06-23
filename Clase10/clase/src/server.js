import express from "express";
import __dirname from "./utils.js";
import meterRouter from "./routes/meterRouter.js";


const app = express();

app.use(express.json());
app.use(express.urlencoded({extended: true}));

app.set("views", __dirname + "/views");
app.set("view engine", ".ejs");

app.use("/datos", meterRouter);


const PORT = process.env.PORT || 8080;
const server = app.listen(PORT, ()=>{console.log(`Server listening on port: ${PORT}`)});
