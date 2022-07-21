import mongoose from "mongoose";

const EstudiantesSchema = new mongoose.Schema({
    nombre: {type: String, requiere: true, max: 100},
    apellido: {type: String, requiere: true, max: 100},
    edad: {type: Number, requiere: true},
    dni: {type: Number, unique: true, requiere: true},
    curso: {type: String, requiere: true, max: 3},
    nota: {type: Number, requiere: true},
    ingreso: {type: Boolean}
})
const estudiantesModel = mongoose.model("estudiante", EstudiantesSchema);

const main = async() => {
    try {
        //Coneccion
        await mongoose.connect('mongodb://127.0.0.1:27017/colegio');
        console.log("Base de datos conectada");

        //Actualizar el dni del estudiante Lucas Blanco a 20355875
        let data = await estudiantesModel.updateOne({nombre: "Lucas", apellido: "Blanco"}, {$set: {dni: 20355875}})
        console.log("DNI de lucas blanco actualizado");
        console.log(data);

        //agregar un campo 'ingreso' a todos los documentos con el valor false.
        data = await estudiantesModel.updateMany({}, {$set: {ingreso: false}});
        console.log("Campo ingreso agregado");
        console.log(data); 
        
        //Modificar el valor de 'ingreso' a true para todos los estudiantes que pertenezcan al curso 1A.
        data = await estudiantesModel.updateMany({curso: "1A"}, {$set: {ingreso: true}});
        console.log("Campo ingreso de los del 1A actualizado");
        console.log(data); 
        
        //Listar los estudiantes que aprobaron (hayan sacado de 4 en adelante) sin los campos de _id y __v.
        data = await estudiantesModel.find({nota: {$gte: 4}}, {_id: 0, __v: 0});
        console.log("estudiantes que aprobaron: ");
        console.log(data); 

        //Listar los estudiantes que posean el campo 'ingreso' en true sin los campos de _id y __v.
        data = await estudiantesModel.find({ingreso: true}, {_id: 0, __v: 0});
        console.log("estudiantes que ingresaron: ");
        console.log(data); 

        //Borrar de la colección de estudiantes los documentos cuyo campo 'ingreso' esté en true.
        data = await estudiantesModel.deleteMany({ingreso: true});
        console.log("estudiantes eliminados");
        console.log(data); 

        //Listar el contenido de la colección estudiantes utilizando la consola, imprimiendo en cada caso los datos almacenados (sin el campo __v) junto a su fecha de creación obtenida del ObjectID en formato YYYY/MM/DD HH:mm:SS. 
        data = await estudiantesModel.find({}, {__v: 0});
        console.log("todos los estudiantes: ");
        console.log(data); 

    } catch (error) {
        console.log(error);
    } finally{
        mongoose.disconnect()
    }
}

main();