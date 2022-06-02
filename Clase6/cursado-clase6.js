import http from "http";
const PORT = 8080;
const server = http.createServer((req, res) =>{
    let message = "";
    const hora = new Date().getHours();
    if (hora >=6 && hora <= 12){
        message = "Buenos dias";
    }else if (hora > 12 && hora <20 ){
        message = "Buenas tardes";
    }else{
        message = "Buenas noches";
    }
    res.end(message)
})
server.listen(PORT,()=> console.log("Server listo"));