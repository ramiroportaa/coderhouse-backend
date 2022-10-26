/**
 * Users.js
 *
 * @description :: A model definition represents a database table/collection.
 * @docs        :: https://sailsjs.com/docs/concepts/models-and-orm/models
 */

module.exports = {
  tableName: 'users',
  attributes: {
    email: {type: 'string', required: true, unique: true},
    password: {type: 'string', required: true},
    role: {type: 'string', defaultsTo: "user"},
    firstName: {type: 'string', required: true},
    lastName: {type: 'string', required: true},
    address: {type: 'string', required: true},
    age: {type: 'number', required: true},
    tel: {type: 'string', required: true},
    avatar: {type: 'string', defaultsTo: "/uploads/avatar-anonimo.jpg"},
    currentCart: {type: 'string', defaultsTo: ""}

  },

};

