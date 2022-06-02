import fs from "fs";

//Ejercicio de ejecucion en orden con funcion asincronica (setInterval) y uso de callbacks.
const fin = ()=> console.log("termine");
const mostrarLetras = (string, cb)=>{
    let i = 0;
    const intervalo = setInterval(()=>{
        console.log(string[i]);
        i++;
        if (i >= string.length){
            clearInterval(intervalo);
            cb();
        }
    },1000);
}
//mostrarLetras("Hola", fin);
//setTimeout(mostrarLetras,250,"Hola",fin);
//setTimeout(mostrarLetras,500,"Hola",fin);

//Ejercicio de manejo de archivos usando fs con promises para asincronismo con async...await (o then...catch).
const crearCarpeta = async ()=>{
    try {
        await fs.promises.mkdir("./ciudades");
        console.log("CARPETA CREADA CON EXITO");
    } catch (error) {
        console.log("ERROR AL CREAR CARPETA", error);
    }
}
const escribir = async ()=>{
    try {
        const arr = [{nombre: "Bs As", poblacion: 12000}, {nombre: "San Juan", poblacion: 6000}, {nombre: "Cordoba", poblacion: 8000}];
        await fs.promises.writeFile("./ciudades/ciudades.txt", JSON.stringify(arr,null,"\t"), "utf-8");
        console.log("ARCHIVO ESCRITO CON EXITO");
    } catch (error) {
        console.log("ERROR AL ESCRIBIR", error);
    }
}
const leer = async ()=>{
    try {
        const lectura = await fs.promises.readFile("./ciudades/ciudades.txt", "utf-8");
        const arr2 = JSON.parse(lectura);
        console.log("ARCHIVO LEIDO CON EXITO");
        arr2.forEach(element => {
            console.log(`Ciudad: ${element.nombre}
            Poblacion: ${element.poblacion}`);
        });
    } catch (error) {
        console.log("ERROR AL LEER", error);
    }
}
//crearCarpeta().then(res => escribir()).then(res => leer());