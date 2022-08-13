const express = require("express");
const session = require("express-session");
const bcrypt = require("bcrypt");
const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;

const app = express();
const users = [
    //{username: "pepe", password: "pepe123", email: "pepe@mail.com"}
];

//Config Passport LocalStrategies
const isValidPassword = (password, encPassword) =>{
    const isValid = bcrypt.compareSync(password, encPassword);
    return isValid;
}

const createEncPassword = (password)=>{
    return bcrypt.hashSync(password, bcrypt.genSaltSync(10));
}

passport.use("login", new LocalStrategy(
    (username, password, done) => {
        const user = users.find( user => user.username == username);

        if (!user || !isValidPassword(password, user.password)) return done(null, false);

        return done(null, user);
    }
));

passport.use("register", new LocalStrategy({
    passReqToCallback: true
   },   
    (req, username, password, done) => {
        const userDb = users.find( userDb => userDb.username == username);

        if (userDb) return done(null, false);

        const newUser = {
            username,
            password: createEncPassword(password),
            email: req.body.email
        }

        users.push(newUser);

        return done(null, newUser);
    }
));

app.use(session({
    secret: "coderhouse",
    resave: false,
    rolling: true,
    saveUninitialized: false,
    cookie: {
        maxAge: 60000
    }
}));

//Inicializacion de passport
app.use(passport.initialize());
app.use(passport.session());

passport.serializeUser((user, done) => {
    done(null, user.username);
});
  
passport.deserializeUser((username, done) => {
    const user = users.find(user => user.username == username);
    done(null, user);
});
  

app.use(express.json());
app.use(express.urlencoded({extended: true}));

//Config de motor EJS
app.set("views", __dirname + "/views");
app.set("view engine", ".ejs");

app.get("/register", (req, res)=>{
    res.render("register.ejs", {});
})                                                        //Para evitar que quede autenticado post registro uso session: false.
app.post("/register", passport.authenticate("register", {failureRedirect: "/failregister", session: false}), (req, res)=>{
    res.send("Registrado correctamente");
})

app.get("/login", (req, res)=>{
    if (req.isAuthenticated()) return res.redirect("/datos");
    res.render("login.ejs", {});
})

app.post("/login", passport.authenticate("login", {failureRedirect: "/faillogin"}), (req, res)=>{
    res.redirect("/datos");
})

const middleware = (req, res, next)=>{
    if (!req.isAuthenticated()) return res.redirect("/login");
    next();
}

app.get("/datos", middleware, (req, res) =>{
    const user = req.user;
    if (!req.session.contador) req.session.contador = 0;
    req.session.contador++;
    const contador = req.session.contador;
    res.json({user, contador});
})

app.get("/logout", middleware, (req, res) =>{
    req.logout({}, err => console.log(err));
    res.send("Deslogueado ;)");
})

app.get("/faillogin", (req, res)=>{
    res.send("F al loguear :(");
})

app.get("/failregister", (req, res)=>{
    res.send("FFF al registrar");
})

const PORT = 8080;
const server = app.listen(PORT, ()=>{console.log(`Server listening on PORT: ${PORT}`)});
server.on("error", err => console.log(`ERROR on server: ${err}`));