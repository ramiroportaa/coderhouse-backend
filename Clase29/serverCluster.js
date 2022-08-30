import express from "express";
import cluster from "cluster";
import os from "os";

const PORT = process.argv[2] || 8080;
const numCPU = os.cpus().length;

const app = express();

if (cluster.isPrimary) {
  console.log(`Cant de proces: ${numCPU}`);
    console.log(`Hola soy el MASTER | PID: ${process.pid}`);
    for (let index = 0; index < numCPU; index++) {
        cluster.fork();
    }

    cluster.on("exit", (worker, code, signal)=>{
        console.log(`Worker ${worker.process.pid} died :(`);
        cluster.fork();
    })
} else {
  app.get("/", (req, res) => {
    console.log("req a process " + process.pid);
    //Iteracion larga para demorar y ver como cambia de worker al recibir nuevas request.
    for (let index = 0; index < 5e9; index++) {}
    
    res.json({
      message: `Servidor express en ${PORT} - PID ${process.pid} - ${new Date().toLocaleString()}`,
    });
  });
  
  app.listen(PORT, () => {
    console.log(`Server (WORKER) listening on PORT: ${PORT} || PID: ${process.pid}`);
  });
}
