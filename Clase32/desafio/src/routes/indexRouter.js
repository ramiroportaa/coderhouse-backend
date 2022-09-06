import { Router } from "express";
import indexController from "../controllers/indexController.js";

const router = Router();

//Middleware de autenticacion.
const authMiddleware = (req, res, next)=>{
    if (!req.isAuthenticated()) return res.redirect("/login");
    next();
};

router.get("/", authMiddleware, indexController.getIndex);

export default router;