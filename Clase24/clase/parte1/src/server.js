import express from "express";
import session from "express-session";
import sessionFS from "session-file-store";

const FileStore = sessionFS(session);
const app = express();

app.use(session({
    store: new FileStore({path: "./sessions", ttl:60, retries: 0}),
    secret: "secretox",
    resave: false,
    saveUninitialized: false,
    cookie:{
        maxAge: 60000
    }
}));

app.get("/", (req, res)=>{
    req.query.name && (req.session.name = req.query.name);
    req.session.contador = req.session.contador ?  req.session.contador + 1 : 1;
    if (req.session.contador > 1) return res.send(`${req.session.name ? req.session.name : "Usted"} ha visitado el sitio ${req.session.contador} veces`);
    res.send(`Te damos la bienvenida ${req.session.name ? req.session.name : ""}!`);
})

app.get("/olvidar", (req, res)=>{
    const name = req.session.name;
    req.session.destroy( err => {
        if (err) return res.status(500).send({ error : err });
        res.send(`Hasta luego ${name ? name : ""}`);
    })
})

const PORT = process.env.PORT || 8080;
const server = app.listen(PORT, ()=>{console.log(`Server listening on PORT ${PORT}`)});
server.on("error", err => console.log("Oh no! Something broke on server", err));