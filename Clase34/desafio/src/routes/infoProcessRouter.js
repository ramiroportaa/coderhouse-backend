import { Router } from "express";
import os from "os";
import compression from "compression";

const router = Router();

router.get("/", compression(), (req, res)=>{
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

    //console.log(info);
    res.status(200).render("infoProcess.ejs", info);
});

router.get("/noGzip", (req, res)=>{
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

    res.status(200).render("infoProcess.ejs", info);
});

export default router;