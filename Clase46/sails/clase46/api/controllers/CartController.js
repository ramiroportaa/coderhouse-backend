/**
 * CartsController
 *
 * @description :: Server-side actions for handling incoming requests.
 * @help        :: See https://sailsjs.com/docs/concepts/actions
 */

const CartDTO = require("../dtos/cart.DTO");
const WSresponse = require("../libs/WSresponse");

module.exports = {
  getProductsInCart: async (req, res) => {
    try {
      const idCart = req.params.id;
      const cartData = await Cart.findOne(idCart);
      if (!cartData)
        throw { message: `no cart with ID: ${idCart}`, status: 404 };

      //Array para almacenar los productos del carrito a los que se debe actualizar el quantity por ser mayor al stock actual.
      let isUpdateCart = [];

      const productsArray = await Promise.all(
        cartData.productos.map(async (prodInCart) => {
          const productData = await Product.findOne(prodInCart.idProd);

          //Revalidación de stock (ya que el mismo puede haber cambiado y en el cart quedo una cantidad mayor).
          if (prodInCart.quantity > productData.stock) {
            prodInCart.quantity = productData.stock;
            isUpdateCart.push(prodInCart);
          }

          productData.quantity = prodInCart.quantity;

          return productData;
        })
      );

      if (isUpdateCart.length) {
        const newProductsCartData = cartData.productos.map((prod) => {
          isUpdateCart.forEach((prodToUpdate) => {
            if (prod.idProd == prodToUpdate.idProd) return prodToUpdate;
          });
          return prod;
        });

        Cart.updateOne(idCart).set({ productos: newProductsCartData });
      }

      const cart = new CartDTO(cartData, productsArray);

      res.status(200).json(new WSresponse(cart.productos, "success"));
    } catch (error) {
      res.status(error.status).json(new WSresponse(null, error.message, true));
    }
  },
  createCart: async (req, res) => {
    try {
      const data = await Cart.create({ productos: [] }).fetch();

      //Editamos el valor currentCart del user que lo creo.
      const userId = '6357350711e8b45810d9ef09';
      await User.updateOne(userId).set({ currentCart: data.id });

      res.status(201).json(new WSresponse(data.id, "cart created successfully"));
    } catch (error) {
      res.status(error.status).json(new WSresponse(null, error.message, true));
    }
  },
  addProduct: async (req, res) => {
    try {
      const idCart = req.params.id;
      const idProd = req.body.idProd;
      const quantity = Number(req.body.quantity);

      const product = await Product.findOne(idProd);
      if (!product) throw {message: `no product with ID: ${idProd}`, status: 404};
      const stock = product.stock;

      const cart = await Cart.findOne(idCart);
      if (!cart) throw {message: `no cart with ID: ${idCart}`, status: 404};
      const ArrayProducts = cart?.productos;

      const prodInCart = ArrayProducts.find(prod => prod.idProd == idProd);

      if (quantity == 0) throw {message: "Debes agregar al menos 1 unidad", status: 400};

      if (!prodInCart){
          if (quantity > stock) throw {message: `Stock insuficiente: solo quedan ${stock} unidades`, status: 400};
          ArrayProducts.push({idProd,quantity});
      }else{
          const newQuantity = prodInCart.quantity + quantity;
          if (newQuantity > stock) throw {message: `Stock insuficiente: solo puedes agregar ${stock - prodInCart.quantity} unidades mas`, status: 400};
          prodInCart.quantity = newQuantity;
          ArrayProducts.map(prod =>{
              if (prod.idProd == idProd) return prodInCart;
              return prod;
          })
      }

      await Cart.updateOne(idCart).set({productos: ArrayProducts});

      res
        .status(201)
        .json(new WSresponse(null, "product added to cart successfully"));
    } catch (error) {
      res.status(error.status).json(new WSresponse(null, error.message, true));
    }
  },
  deleteCartProductById: async (req, res) => {
    try {
      const idCart = req.params.id;
      const idProd = req.params.id_prod;
      
      const cart = await Cart.findOne(idCart);
      if (!cart) throw {message: `no cart with ID: ${idCart}`, status: 404};
      const productos = cart.productos.filter(prod => prod.idProd != idProd);
      await Cart.updateOne(idCart).set({productos});

      res
        .status(201)
        .json(new WSresponse(null, "product deleted from cart successfully"));
    } catch (error) {
      res.status(error.status).json(new WSresponse(null, error.message, true));
    }
  },
  deleteCart: async (req, res) => {
    try {
      const idCart = req.params.id;
      const idUser = req.user?.id || 'anonimo';

      const cartDeleted = await Cart.destroyOne(idCart);
      if (!cartDeleted) throw { message: `no cart with ID: ${idCart}`, status: 404 }
      
      //Editamos el valor currentCart del user que lo borro.
      await User.updateOne(idUser).set({currentCart: ""});

      res.status(200).json(new WSresponse(null, "cart deleted successfully"));
    } catch (error) {
      res.status(error.status).json(new WSresponse(null, error.message, true));
    }
  },
};
