# clase-46 | Desafío uso de Framework.

## Aclaraciones:

1. Se optó por usar el framework "SAILS".
2. Los datos se almacenan en una base de datos mongo atlas. Por lo que no hay que configurar esto para testear el desafío (la url se incluyo hardcodeada).
3. El proyecto se inicio de cero, solo con la parte del back a modo de "API RESTful", por lo que no se incluyen vistas y las rutas se pueden probar desde postman.
4. Se incluyo passport para autenticación de usuarios. Por lo que se debe hacer un POST a /login pasando por body el email y password de algún usuario para probar rutas protegidas (todas las de carrito y POST, PUT y DELETE de productos).

## Rutas implementadas:

```json
  'GET /api/product': Devuelve todos los productos existentes en la base de datos,
  'GET /api/product/:id': Devuelve el producto correspondiente al id que se pasa por param (ejemplo: 'localhost:1337/api/product/62ddd592f57176b6fa06c6df'),
  'POST /api/product': En el body se debe inculir: {
        nombre,
        descripcion,
        codigo,
        foto,
        precio,
        stock
  }. Esto agrega un producto a la base de datos, y devuelve los datos del mismo,
  'PUT /api/product/:id': En el body se pasa el campo a actualizar. Devuelve el producto actualizado,
  'DELETE /api/user/:id': Elimina el producto de la base de datos y devuelve los datos del mismo.

  'GET /api/user': Pasando por query el email, devuelve el usuario correspondiente (ejemplo: 'localhost:1337/api/user?email=rami@mail.com'),
  'GET /api/user/:id': Pasando el id como param al final de la url, devuelve el usuario correspondiente (ejemplo: 'localhost:1337/api/user/6357322de132980050323a06'),
  'POST /api/user': En el body se debe inculir: {
        email,
        password,
        firstName,
        lastName,
        address,
        age,
        tel
  }. Esto registra un usuario en la base de datos encriptando la password con bcrypt, y devuelve los datos del mismo,
  'PUT /api/user/:id': En el body se pasa el campo a actualizar. Devuelve el usuario actualizado,
  'DELETE /api/user/:id': Elimina el usuario de la base de datos y devuelve los datos del mismo.

  'GET /api/cart/:id/products': Devuelve el array de productos del carrito al cual corresponde el id,
  'POST /api/cart': Crea un nuevo carrito. No requiere pasar nada por el body,
  'POST /api/cart/:id/products': Agrega la cantidad indicada de un producto al array de "productos" del carrito correspondiente. En el body se pasa: {
    idProd,
    quantity
  },
  'DELETE /api/cart/:id/products/:id_prod': Elimina un producto del carrito indicado,
  'DELETE /api/cart/:id': Elimina el carrito por completo de la base de datos,

```
<------------------------------------------->

a [Sails v1](https://sailsjs.com) application


### Links

+ [Sails framework documentation](https://sailsjs.com/get-started)
+ [Version notes / upgrading](https://sailsjs.com/documentation/upgrading)
+ [Deployment tips](https://sailsjs.com/documentation/concepts/deployment)
+ [Community support options](https://sailsjs.com/support)
+ [Professional / enterprise options](https://sailsjs.com/enterprise)


### Version info

This app was originally generated on Mon Oct 24 2022 15:47:53 GMT-0300 (hora estándar de Argentina) using Sails v1.5.3.

<!-- Internally, Sails used [`sails-generate@2.0.7`](https://github.com/balderdashy/sails-generate/tree/v2.0.7/lib/core-generators/new). -->



<!--
Note:  Generators are usually run using the globally-installed `sails` CLI (command-line interface).  This CLI version is _environment-specific_ rather than app-specific, thus over time, as a project's dependencies are upgraded or the project is worked on by different developers on different computers using different versions of Node.js, the Sails dependency in its package.json file may differ from the globally-installed Sails CLI release it was originally generated with.  (Be sure to always check out the relevant [upgrading guides](https://sailsjs.com/upgrading) before upgrading the version of Sails used by your app.  If you're stuck, [get help here](https://sailsjs.com/support).)
-->

