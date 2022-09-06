import express from "express";
import compression from "compression";

const app = express();

// app.use(express.json());
// app.use(express.urlencoded({extended: true}));
app.use(compression({ filter: (req, res) => { var x = compression.filter(req, res); console.log('to-be-compressed', x, ' ', req.originalUrl); return x; } }));

app.get("/gzip", (req, res)=>{
    res.send("Hola".repeat(50000));
})

app.listen(3000, ()=>{console.log("Server listening :)")});