//Lectura y escritura de archivos con fs asincro y callbacks...
import fs from "fs";
fs.readFile("package.json","utf-8",(err, data) =>{
    if (err) {
        console.log("error de lectura", err);
    }else{
        const info = {};
        info.contenidoStr = data;
        info.contenidoObj = JSON.parse(data);
        info.size = Buffer.from(data).length;
        console.log(info);
        fs.writeFile("info.txt", JSON.stringify(info,null,"\t"), err =>{
            if (err){
                console.log("error al escribir", err);
            }else{
                console.log("Archivo guardado!");
            }
        })
    }
})