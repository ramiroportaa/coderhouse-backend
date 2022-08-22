import Yargs from "yargs/yargs";

const args = Yargs(process.argv.slice(2)).argv;

let suma = 0;
let max;
let min;
const tipos = [];
let err;

process.on("exit", (code)=>{
    console.log("exit with code: " + code);
    if (err) console.log(err);
})

if (!args._.length) {
    err = {
        error: {
            descripcion: "entrada vacia"
        }
    }
    process.exit(-4);
}

args._.forEach(element => {
    tipos.push(typeof element);
    if ( !(typeof element == "number") ){
        err = {
            error: {
                descripcion: "error de tipo",
                numeros: args._,
                tipos
            }
        };
        process.exit(-5);
    }
    suma += element;
    if ((element > max) || !max) max = element;
    if ((element < max) || !min) min = element;
});

const promedio =  suma / args._.length;


const obj = {
    datos: {
        numeros: args._,
        promedio,
        max,
        min,
        ejecutable: args.$0,
        pid: process.pid
    }
}

console.log(obj);