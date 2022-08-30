import express from "express";
                                        //ASI PASO EL PUERTO POR CLI y puedo ejecutar varias veces el MISMO archivo sin duplicarlo.
//pm2 start server.js --name="Server-1" --node-args="server.js 8083"

const PORT = process.argv[2] || 8080;

console.log(PORT);

const app = express();
//app.use(express.static("public"));
app.listen(PORT, () => {
  console.log(
    `Server listening on PORT: ${PORT} || PID: ${process.pid}`
  );
});

app.get("/", (req, res) => {
  console.log("Req a PID: " + process.pid);
  res.json({
    message: `Servidor express en ${PORT} - PID ${
      process.pid
    } - ${new Date().toLocaleString()}`,
  });
});