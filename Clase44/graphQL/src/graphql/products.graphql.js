import productsService from "../services/products.service.js";
//Funciones que llaman a los services para obtener y devolver la data segun el schema de graphql.
const getProductById = async ({ id }) => {
  try {
    const product = await productsService.getById(id);
    return product;
  } catch (error) {
    throw new Error(error.message);
  }
};

const getProducts = async () => {
  try {
    const products = await productsService.getAll();
    return products;
  } catch (error) {
    throw new Error(error.message);
  }
};

const createProduct = async ({ datos }) => {
  try {
    const newProduct = await productsService.add(datos);
    return newProduct;
  } catch (error) {
    throw new Error(error.message);
  }
};

const updateProduct = async ({ id, datos }) => {
  try {
    await productsService.updateById(id, datos);
    const updatedProduct = await productsService.getById(id);
    return updatedProduct;
  } catch (error) {
    throw new Error(error.message);
  }
};

const deleteProduct = async ({ id }) => {
  try {
    await productsService.deleteById(id);
    return `product ${id} eliminado exitosamente`;
  } catch (error) {
    throw new Error(error.message);
  }
};

export default {
    getProductById,
    getProducts,
    createProduct,
    updateProduct,
    deleteProduct
}