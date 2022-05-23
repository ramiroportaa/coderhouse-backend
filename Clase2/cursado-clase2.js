const mostrarLista = (array)=>{
    if (!array.length) return console.log("lista vacia");
    array.forEach(element => {
        console.log(element);
    });
}

const crearMulti = (multiplicador)=>{
    return multiplicando => console.log(multiplicador * multiplicando);
}

const duplicar = crearMulti(2);
duplicar(5);
const triplicar = crearMulti(3);
triplicar(5);

class Contador{
    static conteo = 0;
    constructor(responsable){
        this.responsable = responsable;
        this.conteo = 0;
    }
    getResponsable(){
        return this.responsable;
    }
    getCuentaIndividual(){
        return this.conteo;
    }
    getCuentaGlobal(){
        return Contador.conteo;
    }
    contar(){
        this.conteo++;
        Contador.conteo++;
    }
}

const contador1 = new Contador("Rama");
const contador2 = new Contador("Juan");

contador1.contar();
contador1.contar();
contador2.contar();
console.log(contador1.getResponsable() + ": " + contador1.getCuentaIndividual(), contador2.getResponsable() + ": " + contador2.getCuentaIndividual());
console.log(contador1.getCuentaGlobal());
console.log(Contador.conteo);