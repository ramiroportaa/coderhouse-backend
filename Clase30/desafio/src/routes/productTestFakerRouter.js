import { Router } from "express";
import productsTestController from "../controllers/productsTestController.js";

const router = Router();

router.get("/", productsTestController.fakerTest);

export default router;