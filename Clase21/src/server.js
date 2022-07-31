import express from "express";
import { faker } from '@faker-js/faker';

faker.locale = "es";

const app = express();
const PORT = 8080;

app.use(express.json());
app.use(express.urlencoded({extended: true}));

let users = [];

const addUser = (quantity) =>{
    for (let index = 0; index < quantity; index++) {
        const obj = {};
        obj.id = users[users.length-1]?.id + 1 || 1;
        obj.nombre = faker.name.findName();
        obj.email = faker.internet.email();
        obj.website = faker.internet.url();
        obj.imagen = faker.image.avatar();
        users.push(obj);
    }
}

const getUser = (id)=>{
    if (id) {
        const user = users.find( u => u.id == id);
        return user
    }
    return users;
}

const updateUser = (id, newData)=>{
    const userIndex = users.findIndex( u => u.id == id);

    users[userIndex].nombre = newData.nombre || users[userIndex].nombre;
    users[userIndex].email = newData.email || users[userIndex].email;
    users[userIndex].website = newData.website || users[userIndex].website;
    users[userIndex].imagen = newData.imagen || users[userIndex].imagen;
}

const deleteUser = (id)=>{
    users = users.filter( u => u.id != id);
}

///test?cant=30
app.get("/api/usuarios/:id?", (req, res)=>{
    const id = Number(req.params.id) || null;
    const data = getUser(id);
    console.log(data);
    res.json(data);
})

///api/usuarios/popular?cant=n
app.post("/api/usuarios/popular", (req, res)=>{
    const cant = Number(req.query.cant) || 50;
    addUser(cant);
    res.json(users);
})

app.post("/api/usuarios", (req, res)=>{
    addUser(1);
    res.json(users);
})

app.put("/api/usuarios/:id", (req, res)=>{
    const id = Number(req.params.id);
    updateUser(id, req.body);
    res.send("actualizado correctamente");
})

app.delete("/api/usuarios/:id", (req, res)=>{
    const id = Number(req.params.id);
    deleteUser(id);
    res.send("borrado correctamente");
})



const server = app.listen(PORT, ()=> console.log(`Server listening on PORT: ${PORT}`));
server.on("error", (err)=> console.log("Error en el server :( ...", err));