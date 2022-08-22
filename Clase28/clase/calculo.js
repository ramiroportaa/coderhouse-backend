export const sumar = ()=>{
    let suma = 0;
    for (let i = 0; i < 5e9; i++) {
        suma += i
    }
    return suma;
}

process.on('message', msg => {
    const suma = sumar();
    process.send(suma);
    process.exit();
 })
 

process.send("listo");