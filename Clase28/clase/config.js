import dotenv from "dotenv";
dotenv.config();

export default {
    PORT: process.env.PORT || 3000,
    HOST: process.env.HOST || "127.0.0.1"
}