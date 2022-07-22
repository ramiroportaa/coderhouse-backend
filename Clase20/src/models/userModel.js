import mongoose from "mongoose";

const UserSchema = mongoose.Schema({
    nombre: {type: String, require: true, max:100},
    apellido: {type: String, requiere: true, max: 100},
    dni: {type: Number, unique: true, requiere: true}
})

const userModel = mongoose.model("user", UserSchema);

export default userModel;