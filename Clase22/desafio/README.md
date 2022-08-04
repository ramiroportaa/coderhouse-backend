# Desafio Clase 22:
Para probar el proyecto:
1) abrir XAMPP y startear MySql.
2) asegurarse de que existe una base de datos SQL llamada "ecommerce", sino crearla.

2)
Si uso ATLAS:
1) cambiar la URL de conexion en el archivo "options.js" (URLMongo).

Si uso local:
1) abrir powershell en ruta de la carpeta "src" del proyecto.
2) crear una carpeta db.
2) ejecutar: "mongod --dbpath db" en la powershell.
3) En otra powershell, en la ruta del proyecto correr "npm start".