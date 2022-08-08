# Desafio Clase 24:
- Para la persistencia de los productos en Maria DB (SQL):
1) abrir XAMPP y startear MySql.
2) asegurarse de que existe una base de datos SQL llamada "ecommerce", sino crearla.

- Para la persistencia de los mensajes:
Si uso ATLAS:
1) cambiar la URL de conexion en el archivo "options.js" (URLMongo).

Si uso local:
1) abrir powershell en ruta de la carpeta "src" del proyecto.
2) crear una carpeta db.
3) ejecutar: "mongod --dbpath db" en la powershell.

-No olvidar:
En la ruta del proyecto correr "npm install" para instalar los node modules necesarios.
Por ultimo, "npm start".