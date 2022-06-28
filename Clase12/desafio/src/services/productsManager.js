class productos {
    constructor(){
        this.productos = [
            {
              "title": "Escuadra",
              "price": 123.45,
              "thumbnail": "https://cdn3.iconfinder.com/data/icons/education-209/64/ruler-triangle-stationary-school-256.png",
              "id": 1
            },
            {
              "title": "Calculadora",
              "price": 234.56,
              "thumbnail": "https://cdn3.iconfinder.com/data/icons/education-209/64/calculator-math-tool-school-256.png",
              "id": 2
            },
            {
              "title": "Globo Terráqueo",
              "price": 345.67,
              "thumbnail": "https://cdn3.iconfinder.com/data/icons/education-209/64/globe-earth-geograhy-planet-school-256.png",
              "id": 3
            }
           ];
    }
    getAll (){
        return {products: this.productos};
    }
    getById (id){
        const data = this.productos.find(prod => prod.id == id);
        if (data) return data;
        return { error : 'producto no encontrado' };
    }
    add (product){
        product.id = this.productos[this.productos.length-1]?.id + 1 || 1;
        this.productos.push(product);
        return product;
    }
    update (id, newData){
        const existe = (this.productos.filter(prod => prod.id === id)).length ? true : false;
        if (!existe) return { error : 'producto no encontrado' };
        newData.id = id;
        this.productos = this.productos.map(prod =>{
            if (prod.id == id) return newData;
            return prod;
        })
        return { message : `producto id: ${id} actualizado` };
    }
    deleteById (id){
        const existe = (this.productos.filter(prod => prod.id === id)).length ? true : false;
        if (!existe) return { error : 'producto no encontrado' };
        this.productos = this.productos.filter(prod => prod.id != id);
        return { message : `producto id: ${id} eliminado`, products: this.productos };
    }
}

export default new productos();