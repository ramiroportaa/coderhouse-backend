import { Application, Router, Context } from "https://deno.land/x/oak/mod.ts";

const app = new Application();
const router = new Router();

const colores = [];

router.get("/", (ctx: Context) => {
  ctx.response.status = 200;
  ctx.response.body = `
  <!DOCTYPE html>
  <html>
    <head><title>Desafío clase 48</title><head>
    <body style="background-color: black; color: white;">
      <h1 style="color: red;">FORMULARIO DE COLORES</h1>
      <form action="/" method="post" enctype="multipart/form-data">
        <label for="color">Escriba el color (en ingles):</label>
        <input type="text" name="color" id="color">
        <button type="submit"> Agregar </button>
      </form>
      <h1>Colores agregados: </h1>
      <section>
        <ul id="colores">
        ${colores.map( col =>{
          return `<li style="color: ${col};"> ${col} </li>`
        })}
        </ul>
      </section>
    </body>
  </html>
  `;
});

router.post("/", async (ctx: Context) => {
  const color = (await ctx.request.body({type: "form-data"}).value.read()).fields.color;
  colores.push(color);
  ctx.response.redirect("/");
})

app.use(router.routes());
app.use(router.allowedMethods());

app.listen({ port: 3000 });
console.log("Server listening http:127.0.0.1:3000");