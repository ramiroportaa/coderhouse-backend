import __dirname from "../dirname.js";

const getLogin = (req, res)=>{
    if (req.isAuthenticated() && req.user.role == "admin") return res.redirect("/admin");
    if (req.isAuthenticated()) return res.redirect("/tienda");
    res.sendFile(__dirname + "/views/login.html");
}

const postLogin = (req, res)=>{
    if (req.user.role == "admin") return res.redirect("/admin");
    res.redirect("/tienda");
}

export default {
    getLogin,
    postLogin
}