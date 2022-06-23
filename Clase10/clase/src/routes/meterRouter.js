import {Router} from "express";
import {meterController} from "../controllers/meterController.js"

const router = Router();

router.get("/", meterController)

export default router;