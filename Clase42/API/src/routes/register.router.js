import { Router } from "express";
import registerController from "../controllers/register.controller.js";

const router = Router();

router.get("/", registerController.getRegister);

export default router;