import dotenv from "dotenv";
import yargs from "yargs/yargs";

dotenv.config();
const args = yargs(process.argv.slice(2)).alias({p: "PORT", m: "MODO"}).default({p: 8080, m: "FORK"}).argv;

export default {
    MODO: args.MODO,
    PORT: args.PORT,
    HOST: process.env.HOST || '127.0.0.1',
    MONGO_URL: process.env.MONGO_URL,
    CONFIG_MARIADB: {
        client: 'mysql',
        connection: {
          host : process.env.HOST || '127.0.0.1',
          user : process.env.MARIADB_USER,
          password : process.env.MARIADB_PASS,
          database : process.env.MARIADB_DB
        }
    }
}