import knex from "./db.js";
const main = async() => {
    try {
        console.log("Borrando tabla si es que existe...");
        await knex.schema.dropTableIfExists('articulo');

        console.log("Creando tabla articulo");
        await knex.schema.createTable('articulo', (table) => {
            table.increments('id').notNullable().primary();
            table.string('nombre', 15).notNullable();
            table.string('codigo', 10).notNullable();
            table.float('precio');
            table.integer('stock');
        })
        
        console.log("Insertando 5 articulos en la tabla");
        const articulos = [
            {nombre: "Remera", codigo:"xxx001", precio: 3500, stock: 7},
            {nombre: "Pantalon", codigo:"xxx002", precio: 7100, stock: 5},
            {nombre: "Zapatillas", codigo:"xxx003", precio: 21000, stock: 3},
            {nombre: "Camisa", codigo:"xxx004", precio: 9000, stock: 8},
            {nombre: "Buzo", codigo:"xxx005", precio: 7500, stock: 4}
        ]
        await knex('articulo').insert(articulos);

        console.log("Listando los articulos...");
        const data = await knex.from('articulo').select('*');
        data.forEach(art => console.log(art));

        console.log("Borrando articulo id=3");
        await knex('articulo').where('id', 3).del();

        console.log("Actualizando a cero el stock del id=2");
        await knex('articulo').where('id', 2).update({stock: 0});
    }
    catch (error) {
        console.log(error);
    }
    finally{
        knex.destroy();
    }
}
main();