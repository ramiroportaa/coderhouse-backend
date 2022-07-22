import mongoose from "mongoose";
import userModel from "./models/userModel.js";

const usersArray = [
    { nombre: 'Lucas', apellido: 'Blanco', dni: '30355874' },
    { nombre: 'María', apellido: 'García', dni: '29575148' },
    { nombre: 'Tomas', apellido: 'Sierra', dni: '38654790' },
    { nombre: 'Carlos', apellido: 'Fernández', dni: '26935670' }
]

const main = async ()=>{
    try {
        await mongoose.connect("mongodb+srv://coder:coder123@coderhouse.ymdhmxh.mongodb.net/miBase?retryWrites=true&w=majority");
        console.log("base de datos conectada exitosamente");

        let data;
        //data = await userModel.create(usersArray);
        //console.log("usuarios creados exitosamente");

        data = await userModel.find();
        console.log(data);

        //data = await userModel.create({nombre: 'Federico', apellido: 'Perez', dni: '320118321'});
        //console.log("usuario creado exitosamente: ", data);

        //data = await userModel.updateOne({nombre:"Carlos"}, {$set: {nombre: 'Juan Carlos'}});
        //console.log("usuario actualizado: ", data);

    } catch (error) {
        console.log(error);
    } finally{
        mongoose.disconnect();
    }
}
main();