# Desafío GraphQL: Clase 44 | Curso de Backend | Coderhouse 2022

## Aclaraciones:
1) Para realizar la prueba de funcionalidad completa se opto por usar solo la interfaz que provee GraphiQL (al acceder al endpoint "/api/graphql").

2) A modo de prueba de consulta graphQL desde el front, también se modifico la función "getProductsFromAPI" en el archivo "app.js" incluido en la carpeta public>js.
    Quedando del siguiente modo:
    ![getProductsFromAPI](https://user-images.githubusercontent.com/86528930/196838624-2a2e68d4-3d89-478e-85dc-0fd93c01c246.JPG)

3) Dejo ejemplos de consultas para realizar desde la interfaz de GraphiQL (http://localhost:8080/api/graphql):

```json
### Descomentar las lineas de la consulta/mutacion que se quiera realizar.

#mutation{
#  updateProduct(id:"62ddd592f57176b6fa06c6df", datos: {nombre: "Remera Feliz 😃", precio: 5800, descripcion: "Probando desde graphQL"}){
#    nombre
#    precio
#  }

#  deleteProduct(id: "63479fdf5f248c65df836914")

#  createProduct(datos: {
#    nombre: "Producto GraphQL",
#    descripcion:"Probando desde graphQL",
#    precio: 9999.99,
#    stock: 18,
#    codigo: "xxx148",
#    foto: "https://upload.wikimedia.org/wikipedia/commons/thumb/1/17/GraphQL_Logo.svg/800px-GraphQL_Logo.svg.png"
#  }){
#    nombre
#    _id
#    precio
#  }

#}

#query{
#  getProducts{
#    _id
#    nombre
#  }
#}

#query{
#  getUserByEmail(email:"rami@mail.com"){
#    firstName
#    lastName
#    id
#  }
#}

#mutation{
#  updateUser(id:"632674b11ca89c546a010a78", datos: {firstName: "Ramiro"}){
#    id
#    firstName
#  }
  
#  registerUser(datos: {
#    email: "graphql@mail.com", 
#    firstName:"usuario GQL", 
#    lastName:"GraphQL", 
#    age:20, 
#    address: "Av. aprendiendo 123", 
#    avatar: "https://upload.wikimedia.org/wikipedia/commons/thumb/1/17/GraphQL_Logo.svg/800px-GraphQL_Logo.svg.png",
#    password:"graphql123",
#    role: "admin",
#    tel: 123456789
#  }){
#    id
#    firstName
#  }
	 
#}

#query{
#  getCartProducts(id:"633e169bb3eb1d3dc60fb6d1"){
#		_id
#    nombre
#    quantity
#  }
#}

#mutation {
  #createCart(userId: "632674b11ca89c546a010a78")
#  addProductToCart( idCart:"6350a003290b854f2e8353c9", idProd: "63506f69e7402a200c13838e", quantity: 2){
#    _id
#    nombre
#    quantity
#  }
#  deleteCartProduct(idCart: "6350a003290b854f2e8353c9", idProd:"63506f69e7402a200c13838e"){
#    _id
#    nombre
#    quantity
#  }
#}

```
