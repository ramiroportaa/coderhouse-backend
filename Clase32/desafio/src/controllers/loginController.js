import __dirname from "../utils.js";
import passport from "passport";
import { Strategy as LocalStrategy } from "passport-local";
import bcrypt from "bcrypt";
import usersModel from "../models/usersModel.js";

const isValidPassword = (password, encPassword) =>{
    const isValid = bcrypt.compareSync(password, encPassword);
    return isValid;
}

passport.use("login", new LocalStrategy(
    async (username, password, done) => {
        const user = await usersModel.getByUsername(username);

        if (!user || !isValidPassword(password, user.password)) return done(null, false);

        return done(null, user);
    }
));

passport.serializeUser((user, done) => {
    done(null, user.username);
});
passport.deserializeUser(async (username, done) => {
    const user = await usersModel.getByUsername(username);
    done(null, user);
});

const getLogin = (req, res)=>{
    if (req.isAuthenticated()) return res.redirect("/");
    res.sendFile(__dirname + "/views/login.html");
}

const postLogin = (req, res)=>{
    res.redirect("/");
}

export default {
    getLogin,
    postLogin
}