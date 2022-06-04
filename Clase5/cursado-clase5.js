import moment from "moment";
moment.locale("es");

const nacimiento = "30/03/1998";

const calcularDif = nac => moment(nac, "DD/MM/YYYY").fromNow();

//console.log(calcularDif(nacimiento));

//Ejercicio numeros aleatorios.
const numeros = {};
for (let index = 0; index < 10000; index++) {
    const numAleatorio = Math.round((Math.random() * (20-1)) +1);
    numeros[numAleatorio] = numeros[numAleatorio]+1 || 1;
}
//console.log(numeros);
//Verifico que el total sea 10000.
const total = Object.values(numeros).reduce((acc, curr) => acc+=curr);
//console.log(total);

//Ejercicio array de objetos.
const productos = [
    { id:1, nombre:'Escuadra', precio:323.45 },
    { id:2, nombre:'Calculadora', precio:234.56 },
    { id:3, nombre:'Globo Terráqueo', precio:45.67 },
    { id:4, nombre:'Paleta Pintura', precio:456.78 },
    { id:5, nombre:'Reloj', precio:67.89 },
    { id:6, nombre:'Agenda', precio:78.90 }
]
const nombresArr = productos.map(prod => prod.nombre);
const nombresString = nombresArr.join(", ");
//console.log(nombresString);

const totalPrice = parseFloat(productos.reduce((acc, curr) => acc += curr.precio, 0).toFixed(2));
//console.log(totalPrice);

const promedio = parseFloat((totalPrice/productos.length).toFixed(2));
//console.log(promedio);

const arr = productos.map(prod => prod.precio);
const minimo = Math.min(...arr);
const maximo = Math.max(...arr);
//console.log(minimo);
//console.log(maximo);

const Obj = {nombresString, totalPrice, promedio, minimo, maximo};
//console.log(Obj);
