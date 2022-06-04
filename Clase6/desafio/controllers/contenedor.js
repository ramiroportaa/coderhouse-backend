import fs from "fs";

class Contenedor {
    constructor(fileName){
        this.name = `${fileName}.txt`;
        this.route = `./db/${this.name}`;
        this.data = [];
    }
    async save(object){
        try {
            if (fs.existsSync(this.route)) {
                const read = await fs.promises.readFile(this.route,"utf-8");
                this.data = JSON.parse(read);
            }
            object.id = this.data[this.data.length-1]?.id+1 || 1;
            this.data.push(object);
            await fs.promises.writeFile(this.route,JSON.stringify(this.data,null,2));
            return object.id;
        } catch (error) {
            console.log("error al guardar", error);
        }    
    }
    async getById(number){
        try {
            if (fs.existsSync(this.route)) {
                const read = await fs.promises.readFile(this.route,"utf-8");
                this.data = JSON.parse(read);
                const res = this.data.filter(obj => obj.id === number);
                if (res[0]) return res[0];
                return null;
            }
            return null;
        } catch (error) {
            console.log(`error al obtener el objeto con id: ${number}.`, error);
        } 
    }
    async getAll(){
        try {
            if (fs.existsSync(this.route)) {
                const read = await fs.promises.readFile(this.route,"utf-8");
                this.data = JSON.parse(read);
            }
            return this.data;
        } catch (error) {
            console.log("error al obtener el array", error);
        } 
    }
    async deleteById(number){
        try {
            const read = await fs.promises.readFile(this.route,"utf-8");
            this.data = JSON.parse(read);
            this.data = this.data.filter(obj => obj.id != number);
            await fs.promises.writeFile(this.route,JSON.stringify(this.data,null,2));
            return `Objeto con id: ${number} eliminado.`;
        } catch (error) {
            console.log(`error al eliminar el objeto con id: ${number}.`, error);
        } 
    }
    async deleteAll(){
        try {
            this.data = [];
            await fs.promises.writeFile(this.route,JSON.stringify(this.data,null,2));
            return `Todos los objetos fueron eliminados.`;
        } catch (error) {
            console.log("error al eliminar todos los objetos", error);
        }
    }
}

export default Contenedor;