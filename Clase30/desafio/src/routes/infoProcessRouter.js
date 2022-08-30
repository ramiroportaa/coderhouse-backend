import { Router } from "express";
import os from "os";

const router = Router();

router.get("/", (req, res)=>{
    const info = {
        args: process.argv.slice(2),
        platform: process.platform,
        version: process.version,
        rss: process.memoryUsage.rss(),
        path: process.argv[0],
        pid: process.pid,
        folder: process.argv[1],
        cpus: os.cpus().length
    }

    res.render("infoProcess.ejs", info);
});

export default router;