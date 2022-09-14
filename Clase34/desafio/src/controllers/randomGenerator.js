const random = (cant)=>{
    let obj = {};
    for (let i = 0; i < cant; i++) {
        const numAleatorio = Math.round((Math.random() * (1000-1)) +1);
        obj[numAleatorio] ? obj[numAleatorio] = obj[numAleatorio] + 1 : obj[numAleatorio] = 1;
    }
    return obj;
}

process.on("message", (msg)=>{
    if (typeof msg == "number") process.send(random(msg));
})

process.send("listo");