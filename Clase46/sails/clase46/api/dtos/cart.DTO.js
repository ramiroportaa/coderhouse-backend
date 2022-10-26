class cartDTO {
  constructor(cartData, productsArray) {
    this.id = cartData._id || cartData.id;
    this.timestamp = cartData.timestamp || 0;
    this.productos = productsArray || [];
  }
}

module.exports = cartDTO;
