import knex from "knex";
const config = {
    client: 'mysql',
    connection: {
      host : '127.0.0.1',
      user : 'root',
      password : '',
      database : 'ecommerce'
    }
  }
const database = knex(config);

export default database;