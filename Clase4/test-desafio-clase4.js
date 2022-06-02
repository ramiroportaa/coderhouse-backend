import Contenedor from "./desafio-clase4.js";

const productos = new Contenedor("productos");

const obj1 = {                                                                                                                                                    
    title: 'Escuadra',                                                                                                                                 
    price: 123.45,                                                                                                                                     
    thumbnail: 'https://cdn3.iconfinder.com/data/icons/education-209/64/ruler-triangle-stationary-school-256.png',                                                                                                                                                                               
}
const obj2 = {                                                                                                                                                    
    title: 'Calculadora',                                                                                                                              
    price: 234.56,                                                                                                                                     
    thumbnail: 'https://cdn3.iconfinder.com/data/icons/education-209/64/calculator-math-tool-school-256.png',                                                                                                                                                                                    
}
const obj3 = {                                                                                                                                                    
    title: 'Globo Terráqueo',                                                                                                                          
    price: 345.67,                                                                                                                                     
    thumbnail: 'https://cdn3.iconfinder.com/data/icons/education-209/64/globe-earth-geograhy-planet-school-256.png',                                                                                                                                                                            
}

async function save (obj){
    const res = await productos.save(obj);
    console.log(res);
}
async function getById (id){
    const res = await productos.getById(id);
    console.log(res);
}
async function getAll (){
    const res = await productos.getAll();
    console.log(res);
}
async function deleteById (id){
    const res = await productos.deleteById(id);
    console.log(res);
}
async function deleteAll (){
    const res = await productos.deleteAll();
    console.log(res);
}

const ejecutar = async ()=>{
    console.log("Inicio de pruebas SAVE");
    await save(obj1);
    await save(obj2);
    await save(obj3);
    console.log("FIN de pruebas SAVE");
    console.log("Inicio de prueba GETBYID (2)");
    await getById(2);
    console.log("FIN de prueba GETBYID");
    console.log("Inicio de prueba DELETEBYID (1)");
    await deleteById(1);
    console.log("FIN de prueba DELETEBYID");
    console.log("Inicio de prueba GETALL");
    await getAll();
    console.log("FIN de prueba GETALL");
    console.log("Inicio de prueba DELETEALL");
    await deleteAll();
    console.log("FIN de prueba DELETEALL");
}
ejecutar();