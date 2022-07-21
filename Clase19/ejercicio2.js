import mongoose from "mongoose";

const EstudiantesSchema = new mongoose.Schema({
    nombre: {type: String, requiere: true, max: 100},
    apellido: {type: String, requiere: true, max: 100},
    edad: {type: Number, requiere: true},
    dni: {type: Number, unique: true, requiere: true},
    curso: {type: String, requiere: true, max: 3},
    nota: {type: Number, requiere: true}
})
const estudiantesModel = mongoose.model("estudiante", EstudiantesSchema);

const main = async() => {
    try {
        //Coneccion
        await mongoose.connect('mongodb://127.0.0.1:27017/colegio');
        console.log("Base de datos conectada");

        //estudiantes ordenados por orden alfabético según sus nombres.
        let data = await estudiantesModel.find().sort({nombre: 1});
        console.log("estudiantes ordenados por orden alfabético según sus nombres");
        console.log(data);

        //El estudiante más joven.
        data = await estudiantesModel.find().sort({edad: 1}).limit(1);
        console.log("El estudiante más joven: ", data);
        
        //Los estudiantes que pertenezcan al curso '2A'.
        data = await estudiantesModel.find({curso: "2A"})
        console.log("Los estudiantes que pertenezcan al curso '2A'.");
        console.log(data);

        //El segundo estudiante más joven.
        data = await estudiantesModel.find().sort({edad: 1}).skip(1).limit(1);
        console.log("El segundo estudiante más joven: ", data);

        //Sólo los nombres y apellidos de los estudiantes con su curso correspondiente, ordenados por apellido descendente (z a a).
        data = await estudiantesModel.find({},{nombre: 1, apellido: 1, curso: 1, _id:0}).sort({apellido: -1});
        console.log("Sólo los nombres y apellidos de los estudiantes con su curso correspondiente, ordenados por apellido descendente (z a a).");
        console.log(data);

        //Los estudiantes que sacaron 10.
        data = await estudiantesModel.find({nota: 10})
        console.log("Los estudiantes que sacaron 10.");
        console.log(data);

        
        //El promedio de notas del total de alumnos.
        data = await estudiantesModel.find({}, {nota: 1, _id: 0});
        let totalEstudiantes = data.length;
        let promedio = data.reduce((acc, prev) => acc + prev.nota/totalEstudiantes , 0);
        console.log("promedio: ", promedio);

        //El promedio de notas del curso '1A'.
        data = await estudiantesModel.find({curso: "1A"}, {nota: 1, _id: 0});
        totalEstudiantes = data.length;
        promedio = data.reduce((acc, prev) => acc + prev.nota/totalEstudiantes , 0);
        console.log("promedio del curso 1A: ", promedio);

    } catch (error) {
        console.log(error);
    } finally{
        mongoose.disconnect()
    }
}

main();