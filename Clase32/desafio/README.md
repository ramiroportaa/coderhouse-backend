# Desafios Clase 32:

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
Correr el server con "npm start".

## Loggers y Gzip (Parte 1).

### Gzip:
   1) Se agrego el middleware de compression para la ruta "/info".
   2) Se agrego otra ruta "/info/np-gzip" que devuelve exactamente lo mismo que "/info" pero sin compression.
   3) Desde la herramienta de Red/Netwrok del navegador, al hacer peticiones a ambas rutas, podemos notar un menor tamaño de respuesta en la 1ra ("/info").

### Loggers:
   Se opto por utilizar la librería "winston".
   Se creo un archivo logger.js para implementar la configuración del logger.
   Para probar el logger.error se puede forzar un error al darle stop a la conexión de MySql en XAMPP.

## Análisis completo de performance (Parte 2).

### Perfilamiento del servidor, realizando el test con --prof de node.js:

#### Artillery:
   - Prueba con el console.log() antes del response en la ruta "/info":
   1. Ejecuto la siguiente linea en consola en la ruta del proyecto →  node --prof src/server.js
   2. En una nueva consola en la ruta del proyecto → artillery quick --count 20 -n 50 http://localhost:8080/info > profiling/result_consoleLog.txt
   3. Finalizado el test de carga, finalizo el proceso de node y renombro el archivo que se creo cuyo nombre finaliza en "...v8.log" y lo muevo dentro de la carpeta "profiling".
   4. Luego vuelvo a la consola donde ejecute node, y para procesar los datos de profiling de node ejecuto: node --prof-process profiling/consoleLog-v8.log > profiling/consoleLog-v8_prof_process.txt

   - Prueba SIN el console.log() antes del response en la ruta "/info":
   1. Ejecuto la siguiente linea en consola en la ruta del proyecto →  node --prof src/server.js
   2. En una nueva consola en la ruta del proyecto → artillery quick --count 20 -n 50 http://localhost:8080/info > profiling/result_NO-consoleLog.txt
   3. Finalizado el test de carga, finalizo el proceso de node y renombro el archivo que se creo cuyo nombre finaliza en "...v8.log" y lo muevo dentro de la carpeta "profiling".
   4. Luego vuelvo a la consola donde ejecute node, y para procesar los datos de profiling de node ejecuto: node --prof-process profiling/NO-consoleLog-v8.log > profiling/NO-consoleLog-v8_prof_process.txt

   ![Artillery](https://user-images.githubusercontent.com/86528930/188513035-7cb983cc-80ad-4cfd-9ff9-266a484abded.JPG)
   ![Profiling-node](https://user-images.githubusercontent.com/86528930/188513043-39144899-1d05-4362-86ec-06397a1bd228.JPG)
   
   Conclusion: Como podemos ver en las imágenes anteriores, el servidor es prácticamente el doble de eficiente al no incluir el console log (el cual es un proceso bloqueante). Comparando los resultados con y sin el console.log, el tiempo de finalización del test se redujo a la mitad, ademas el servidor pudo atender un 77% mas de solicitudes por segundo, en tanto la media de respuesta al cliente bajo de 50.9ms a 19.1ms. Por ultimo, según el reporte de profiling de node, los ticks se redujeron drásticamente de 18952 a 4722.

#### Autocannon:
   NOTA: Se opto por crear un archivo "benchmark.js" con la configuración del test a realizar. También se omitieron los pasos de procesamiento del archivo que crea el comando "--prof" ya que el resultado es el mismo que en el test que se realizo anteriormente con artillery.

   - Prueba con el console.log() antes del response en la ruta "/info":
   1. Ejecuto la siguiente linea en consola en la ruta del proyecto →  node --prof src/server.js
   2. En una nueva consola en la ruta del proyecto → node profiling/benchmark.js
   3. Luego de los 20seg configurados, obtenemos por consola el reporte.

   - Prueba SIN el console.log() antes del response en la ruta "/info":
   1. Ejecuto la siguiente linea en consola en la ruta del proyecto →  node --prof src/server.js
   2. En una nueva consola en la ruta del proyecto → node profiling/benchmark.js
   3. Luego de los 20seg configurados, obtenemos por consola el reporte.

   ![Autocannon](https://user-images.githubusercontent.com/86528930/188517404-d03eb14d-552d-4dc4-bcba-619c1e15a042.JPG)

   Conclusion: En la imagen comparativa de resultados podemos apreciar que los tiempos de latencia son mucho menor en el caso de NO utilizar el console.log, como asi también el proceso que usa console.log atiende en promedio solo un 52% (396.85/754.55) de los request por segundo que logra atender el proceso SIN console.log.


### Perfilamiento del servidor con el modo inspector de node.js --inspect:

   - Prueba con el console.log() antes del response en la ruta "/info":
   1) Primero prendemos el servidor con el comando: node --inspect src/server.js
   2) En el navegador (yo use Chrome), pongo chrome://inspect, luego clic en "Open dedicated DevTools for Node", y por ultimo voy a la pestaña profiler y allí hago clic en el botón de start.
   3) En una nueva consola en la ruta del proyecto → node profiling/benchmark.js
   4) Finalizado el test de carga, clic en el botón stop en el navegador y busco el proceso que corre al infoProcessRouter.js para ver el resultado.

   - Prueba SIN el console.log() antes del response en la ruta "/info":
   1) Primero prendemos el servidor con el comando: node --inspect src/server.js
   2) En el navegador (yo use Chrome), pongo chrome://inspect, luego clic en "Open dedicated DevTools for Node", y por ultimo voy a la pestaña profiler y allí hago clic en el botón de start.
   3) En una nueva consola en la ruta del proyecto → node profiling/benchmark.js
   4) Finalizado el test de carga, clic en el botón stop en el navegador y busco el proceso que corre al infoProcessRouter.js para ver el resultado.

   ![Inspect](https://user-images.githubusercontent.com/86528930/188523726-bfb8c5c8-0839-4da2-ae94-c924928896e7.JPG)

   Conclusion: Se puede apreciar que la linea del console.log nos genera una demora extra de 14.3ms en el procesamiento antes de brindar la respuesta al cliente.

### Diagrama de flama con 0x, emulando la carga con Autocannon:

   - Prueba con el console.log() antes del response en la ruta "/info":
   1. Ejecuto la siguiente linea en consola en la ruta del proyecto →  0x src/server.js
   2. En una nueva consola en la ruta del proyecto → node profiling/benchmark.js
   3. Finalizado el test de autocannon, apagamos el server y vemos que se genera una carpeta de nombre aleatorio. Dentro de esa carpeta encontraremos un archivo "flamegraph.html" que contiene los diagramas.

   - Prueba SIN el console.log() antes del response en la ruta "/info":
   1. Ejecuto la siguiente linea en consola en la ruta del proyecto →  0x src/server.js
   2. En una nueva consola en la ruta del proyecto → node profiling/benchmark.js
   3. Finalizado el test de autocannon, apagamos el server y vemos que se genera una carpeta de nombre aleatorio. Dentro de esa carpeta encontraremos un archivo "flamegraph.html" que contiene los diagramas.

   ![0x](https://user-images.githubusercontent.com/86528930/188528622-1bce2623-8eb4-4d60-8f84-e6a71d282b6c.png)

