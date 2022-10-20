import cartsService from "../services/carts.service.js";
//Funciones que llaman a los services para obtener y devolver la data segun el schema de graphql.
const getCartProducts = async ({ id }) => {
  try {
    const products = await cartsService.getProducts(id);
    return products;
  } catch (error) {
    throw new Error(error.message);
  }
};

const createCart = async ({ userId }) => {
  try {
    const newCartId = await cartsService.createCart(userId);
    return newCartId;
  } catch (error) {
    throw new Error(error.message);
  }
};

const addProductToCart = async ({ idCart, idProd, quantity }) => {
  try {
    await cartsService.addProduct(idCart, idProd, quantity);
    const updatedCart = await cartsService.getProducts(idCart);
    return updatedCart;
  } catch (error) {
    throw new Error(error.message);
  }
};

const deleteCart = async ({ idCart, idUser }) => {
  try {
    await cartsService.deleteById(idCart, idUser);
    return `cart ${id} eliminado exitosamente`;
  } catch (error) {
    throw new Error(error.message);
  }
};

const deleteCartProduct = async ({ idCart, idProd }) => {
  try {
    await cartsService.deleteProductById(idCart, idProd);
    const updatedCart = await cartsService.getProducts(idCart);
    return updatedCart;
  } catch (error) {
    throw new Error(error.message);
  }
};

export default {
    getCartProducts,
    createCart,
    addProductToCart,
    deleteCart,
    deleteCartProduct
}