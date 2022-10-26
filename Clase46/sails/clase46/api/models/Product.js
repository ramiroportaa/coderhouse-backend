/**
 * Product.js
 *
 * @description :: A model definition represents a database table/collection.
 * @docs        :: https://sailsjs.com/docs/concepts/models-and-orm/models
 */

module.exports = {
  tableName: 'products',
  attributes: {
    timestamp: {type: 'number', defaultsTo: Date.now()},
    nombre: {type: 'string', required: true},
    descripcion: 'string',
    codigo: 'string',
    foto: 'string',
    precio: {type: 'number', required: true},
    stock: {type: 'number', required: true}
  },

};

