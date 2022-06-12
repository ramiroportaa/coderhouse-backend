class productos {
    constructor(){
        this.productos = [];
    }
    getAll (){
        return this.productos;
    }
    getById (id){
        const data = this.productos.reduce((acc, curr) => (curr.id == id) ? acc=curr : acc=acc ,0);
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
        return { message : `producto id: ${id} eliminado` };
    }
}

module.exports = new productos();