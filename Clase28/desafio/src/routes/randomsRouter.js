import { Router } from "express";
import randomsController from "../controllers/randomsController.js";

const router = Router();

router.get("/", randomsController);

export default router;