import { Router } from "express";
import passport from "../services/passport.service.js";
import loginController from "../controllers/login.controller.js";

//import WSresponse from "../libs/WSresponse.js";

const router = Router();

router.get("/", loginController.getLogin);
router.post("/", passport.authenticate("login", {failureRedirect: "/login/error"}), loginController.postLogin);

router.get("/error", (req, res)=> res.render("error.ejs", {error: "Invalid credentials"}));

//router.get("/error", (req, res)=> res.status(401).json(new WSresponse(null, "invalid credentials", true, 401)));

export default router;