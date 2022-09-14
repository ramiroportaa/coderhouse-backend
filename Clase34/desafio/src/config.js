import dotenv from "dotenv";
import yargs from "yargs/yargs";

dotenv.config();
const args = yargs(process.argv.slice(2)).alias({p: "PORT", m: "MODO"}).default({p: 8080, m: "FORK"}).argv;

export default {
    MODO: args.MODO,
    PORT: process.env.PORT || args.PORT,
    HOST: process.env.HOST || '127.0.0.1',
    MONGO_URL: process.env.MONGO_URL
}