const express = require("express");
const cookieParser = require("cookie-parser");
const session = require("express-session");
const cookiesRouter = require("./routes/cookiesRouter");
const sessionRouter = require("./routes/sessionRouter");

const app = express();
app.use(express.json());
app.use(express.urlencoded({extended: true}));

app.use(cookieParser());

app.use(session({
    secret: "secretox",
    resave: true,
    saveUninitialized: true
}));

app.use("/cookies", cookiesRouter);
app.use("/session", sessionRouter);

const PORT = process.env.PORT || 8080;
const server = app.listen(PORT, ()=>{console.log(`Server listening on PORT ${PORT}`)});
server.on("error", err => console.log("Oh no! Something broke on server", err));