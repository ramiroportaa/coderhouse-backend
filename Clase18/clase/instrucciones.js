//Ejercicio 1:
use empresa
db.createCollection("cliente")
db.cliente.insertOne({nombre: "Ramiro", edad: 24})
db.cliente.insertMany([{nombre: "Leandro", edad: 26}, {nombre: "Juan", edad: 21}, {nombre: "Santiago", edad: 18}])
db.articulo.insertMany([{nombre: "Remera", precio: 4900, stock: 23}, {nombre: "Pantalon", precio: 9000, stock: 10}, {nombre: "Camisa", precio: 8000, stock: 17}, {nombre: "Zapatillas", precio: 28000, stock: 50}])
show collections
db.cliente.find()
db.articulo.find()
db.articulo.estimatedDocumentCount()

// ---------------------------------------------------------------------------------------------------- //

//Ejercicio 2:
db.cliente.insertMany([{ "nombre" : "Pablo", "edad" : 25 },
{ "nombre" : "Juan", "edad" : 22 },
{ "nombre" : "Lucia", "edad" : 25 },
{ "nombre" : "Juan", "edad" : 29 },
{ "nombre" : "Fede", "edad" : 35 }])
db.cliente.find().sort({edad: -1})
db.cliente.find().sort({edad: 1}).limit(1)
db.cliente.find({nombre: "Juan"})
db.cliente.find({nombre: "Juan", edad: 29})
db.cliente.find({$or: [{nombre: "Juan"}, {nombre: "Lucia"}]})
db.cliente.find({edad: {$gt: 25}})
db.cliente.find({edad: {$lte: 25}})
db.cliente.find({edad: {$ne: 25}})
db.cliente.find({$and: [{edad: {$gte: 26}}, {edad: {$lte: 35}}]})
db.cliente.updateOne({nombre: "Fede"}, {$set: {edad: 36}})
db.cliente.updateMany({edad: 25}, {$set: {edad: 26}})
db.cliente.deleteMany({nombre: "Juan"})

// ---------------------------------------------------------------------------------------------------- //

//Ejercicio 3:
use admin
db.createUser(
    {
      user: "encargado",
      pwd: "qwerty123",
      roles: [
         { role: "readWrite", db: "empresa" }
      ]
    }
  )
  
//Cerramos powershell de mongod.
//Abrimos powershell con mongod --auth --dbpath db
//En otra shell logueamos el usuario y hacemos los test.
mongo -u encargado -p qwerty12345 //No ingresara por fallo en autenticacion.
mongo -u encargado -p qwerty123 //Si ingresa.

use empresa
db.cliente.insertOne({nombre: "Juan", edad: 21})