/**
 * Carts.js
 *
 * @description :: A model definition represents a database table/collection.
 * @docs        :: https://sailsjs.com/docs/concepts/models-and-orm/models
 */

module.exports = {
  tableName: 'carts',
  attributes: {

    timestamp: {type: 'number', defaultsTo: Date.now()},
    productos: {type: 'json', columnType: 'array', required: true}

  },

};

