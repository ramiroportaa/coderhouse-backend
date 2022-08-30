# Desafios Clase 30:

### Antes de comenzar: 
(Aclaración: Uso de Sistema Operativo Windows).

- Para la persistencia de los productos en Maria DB (SQL):
1) abrir XAMPP y startear MySql.
2) asegurarse de que existe una base de datos SQL llamada "ecommerce", sino crearla.

- Para la persistencia de los mensajes:
1) cambiar la URL de conexión en el archivo ".env" (MONGO_URL).

No olvidar que si uso local:
1) abrir powershell en ruta de la carpeta "src" del proyecto.
2) crear una carpeta db.
3) ejecutar: "mongod --dbpath db" en la powershell.

-No olvidar:
En la ruta del proyecto correr "npm install" para instalar los node modules necesarios.

## Ejecutar servidores Node (Parte 1).

### Comandos ejecutados en consola durante el desafío: 

 - Ejecutar el servidor (modos FORK y CLUSTER) con nodemon verificando el número de procesos tomados por node:
    1.1) nodemon ./src/server.js -m FORK → (para levantar el servidor en modo fork).
    1.2) nodemon ./src/server.js -m CLUSTER → (para levantar el servidor en modo cluster).
    2) tasklist /fi "imagename eq node.exe" → (para listar los procesos de node en ejecución).
    Aquí vemos como, al ejecutar el servidor con nodemon, se crea un proceso padre forkeando a nuestro server.

 - Ejecutar el servidor (con los parámetros adecuados) utilizando Forever, verificando su correcta operación. Listar los procesos por Forever y por sistema operativo:
    1.1) forever --watch start ./src/server.js -m FORK → (para levantar el servidor en modo fork).
    1.2) forever --watch start ./src/server.js -m CLUSTER → (para levantar el servidor en modo cluster).
    2) tasklist /fi "imagename eq node.exe" → (para listar los procesos de node en ejecución).
    Aquí nuevamente vemos como, al igual que con nodemon, al ejecutar el servidor con forever, se crea un proceso padre forkeando a nuestro server.
    3) taskkill /pid 18472 /F → (Para eliminar un proceso de servidor).
    Si nuevamente ponemos en consola un - tasklist /fi "imagename eq node.exe" - ó un - forever list - podemos notar como forever vuelve a levantar el proceso automáticamente con un nuevo pid.

 - Ejecutar el servidor (con los parámetros adecuados: modo FORK) utilizando PM2 en sus modos modo fork y cluster. Listar los procesos por PM2 y por sistema operativo:
    1.1) pm2 start ./src/server.js --watch --name="Server-1" (para levantar el servidor en modo fork de codigo y modo fork de pm2).
    1.2) pm2 start ./src/server.js --watch --name="Server-2" -i max (para levantar el servidor en modo fork de codigo y modo CLUSTER de pm2).
    2) tasklist /fi "imagename eq node.exe" → (para listar los procesos de node en ejecución).
    3) taskkill /pid 14024 /F → (Para eliminar un proceso de servidor).
    Si nuevamente ponemos en consola un - tasklist /fi "imagename eq node.exe" - ó un - pm2 status - podemos notar como pm2 vuelve a levantar el proceso automáticamente con un nuevo pid.    

## Servidor NGINX (Parte 2).

 - Redirigir todas las consultas a /api/randoms a un cluster de servidores escuchando en el puerto 8081. El cluster será creado desde node utilizando el módulo nativo cluster. El resto de las consultas, redirigirlas a un servidor individual escuchando en el puerto 8080:
    1) node ./src/server.js -m FORK → (levantamos el server individual en el puerto 8080 por defecto).
    2) node ./src/server.js -m CLUSTER -p 8081 → (levantamos el server en modo CLUSTER por codigo y en el puerto 8081).
    3) corremos nginx.exe (ver antes el archivo nginx.conf, descomentar lo de la primera parte y comentar lo de la segunda).

 - Luego, modificar la configuración para que todas las consultas a /api/randoms sean redirigidas a un cluster de servidores gestionado desde nginx, repartiéndolas equitativamente entre 4 instancias escuchando en los puertos 8082, 8083, 8084 y 8085 respectivamente:
    1.1) pm2 start ./src/server.js --name="Server-1" --node-args="./src/server.js -p 8082"
    1.2) pm2 start ./src/server.js --name="Server-2" --node-args="./src/server.js -p 8083"
    1.3) pm2 start ./src/server.js --name="Server-3" --node-args="./src/server.js -p 8084"
    1.4) pm2 start ./src/server.js --name="Server-4" --node-args="./src/server.js -p 8085"
    (Nota: pm2 no larga error al ejecutar un MISMO script si se le pasa un --name distinto en cada ejecución).
   
    2) corremos nginx.exe (ver antes el archivo nginx.conf, comentar lo de la primera parte y descomentar lo de la segunda).

