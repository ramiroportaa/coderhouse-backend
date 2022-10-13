import axios from "axios";

//Estos 2 modulos se instalaron para poder almacenar en el proceso de node las cookies que genera passoport y envia el server al hacer el login.
//Si no se almacena la cookie, no se puede hacer post a productos ya que el middleware de autenticacion no reconoce que el user este logueado.
import { wrapper } from 'axios-cookiejar-support';
import { CookieJar } from 'tough-cookie';

const jar = new CookieJar();
const instance = wrapper(axios.create({ jar, baseURL: "http://localhost:8080"}));
instance.defaults.withCredentials = true;


const getAllProducts = async ()=> {
    try {
        const res = await instance.get("/api/productos");
        console.log("===== GET ALL PRODUCTS =====");
        console.log(res.data);
        console.log("============================");
    } catch (error) {
        console.log(error);
    }
}

const postOneProduct = async ()=> {
    try {
        const res = await instance.post("/api/productos",{
            nombre: "producto de prueba axios",
            descripcion: "probando desde axios el POST",
            codigo: "xxx999",
            precio: 258.77,
            stock: 9,
            foto: "https://cdn3.iconfinder.com/data/icons/pokemon-go-3/512/pokemon_go_play_game_charcter-256.png"

        }, { withCredentials: true});

        console.log("===== POST ONE PRODUCT =====");
        console.log(res.data);
        console.log("============================");
    } catch (error) {
        console.log(error);
    }
}

const updateProduct = async (id)=> {
    try {
        const res = await instance.put("/api/productos/" + id,{
            nombre: "REMERA FELIZ",
            descripcion: "probando desde axios el PUT",
            foto: "https://cdn3.iconfinder.com/data/icons/essential-pack/32/54-Shirt-256.png"

        });

        console.log("==== UPDATE ONE PRODUCT ====");
        console.log(res.data);
        console.log("============================");
    } catch (error) {
        console.log(error);
    }
}

const deleteProduct = async (id)=> {
    try {
        const res = await instance.delete("/api/productos/" + id);


        console.log("==== DELETE ONE PRODUCT ====");
        console.log(res.data);
        console.log("============================");
    } catch (error) {
        console.log(error);
    }
}

const loginUser = async ()=>{
    try {
        const res = await instance.post("/login", {
            email: "rami@mail.com",
            password: "rami123"
        });

        console.log("==== LOGIN USER ====");
        //console.log(res);
        console.log("============================");
    } catch (error) {
        //console.log(error);
    }
}


//HACER UN GET ALL PRODUCTS, SACAR DE AHI UN ID DE PRODUCTO PARA PROBAR EL UPDATE, Y OTRO PARA EL DELETE.
try {
    await loginUser(); //Debe llamarse siempre antes del POST, PUT y DELETE. Ya que sino devolvera el error de autenticacion.
    await getAllProducts();
    //await postOneProduct();
    //await updateProduct("62ddd592f57176b6fa06c6df");
    //await deleteProduct("63476b21339108311f364368");

} catch (error) {
    console.log(error);
}