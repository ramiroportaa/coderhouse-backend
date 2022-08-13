const express = require("express");
const session = require("express-session");

const app = express();
const users = [{user: "pepe", password: "pepe123", email: "pepe@mail.com"}];

app.use(session({
    secret: "coderhouse",
    resave: false,
    rolling: true,
    saveUninitialized: false,
    cookie: {
        maxAge: 60000
    }
}));

app.use(express.json());
app.use(express.urlencoded({extended: true}));

//Config de motor EJS
app.set("views", __dirname + "/views");
app.set("view engine", ".ejs");

app.get("/register", (req, res)=>{
    res.render("register.ejs", {});
})
app.post("/register", (req, res)=>{
    const user = req.body.user;
    const userDB = users.find( u => u.user == user);

    if (userDB) return res.json({error: "user is already exist"});

    users.push(req.body);
    res.send("Registrado correctamente");
})

app.get("/login", (req, res)=>{
    if (req.session.user) return res.redirect("/datos");
    res.render("login.ejs", {});
})

app.post("/login", (req, res)=>{
    const user = req.body.user;
    const pass = req.body.password;

    const userDB = users.find( u => u.user == user);

    if (userDB && userDB.password == pass) {
        req.session.user = user;
        return res.redirect("/datos");
    }

    res.json({error: "invalid credentials"});
})

const middleware = (req, res, next)=>{
    if (!req.session.user) return res.redirect("/login");
    next();
}

app.get("/datos", middleware, (req, res) =>{
    const user = req.session.user;
    const userDB = users.find( u => u.user == user);
    if (!req.session.contador) req.session.contador = 0;
    req.session.contador++;
    const contador = req.session.contador;
    res.json({user: userDB, contador});
})

app.get("/logout", middleware, (req, res) =>{
    req.session.destroy();
    res.send("Deslogueado ;)");
})

const PORT = 8080;
const server = app.listen(PORT, ()=>{console.log(`Server listening on PORT: ${PORT}`)});
server.on("error", err => console.log(`ERROR on server: ${err}`));