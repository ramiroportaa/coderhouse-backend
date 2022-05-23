class Usuario {
    constructor(nombre, apellido, libros=[], mascotas=[]){
        this.nombre = nombre;
        this.apellido = apellido;
        this.libros = libros;
        this.mascotas = mascotas;
    }
    getFullName(){
        return `${this.nombre} ${this.apellido}`;
    }
    addMascota(mascota){
        this.mascotas.push(mascota);
    }
    countMascotas(){
        return this.mascotas.length;
    }
    addBook(nombre, autor){
        this.libros.push({nombre, autor})
    }
    getBookNames(){
        return this.libros.map(book => book.nombre);
    }
}

const user = new Usuario(
    "Elon",
    "Musk",
    [{nombre: 'El señor de las moscas',autor: 'William Golding'}, {nombre: 'Fundacion', autor: 'Isaac Asimov'}],
    ['perro', 'gato']);

console.log(user.countMascotas());
console.log(user.getBookNames());
console.log(user.getFullName());

user.addBook("Harry Potter", "J.K. Rowling");
user.addMascota("loro");

console.log(user.countMascotas());
console.log(user.getBookNames());