import { buildSchema } from 'graphql';
import productsGraphql from './products.graphql.js';
import usersGraphql from './users.graphql.js';
import cartsGraphql from './carts.graphql.js';

const schema = buildSchema(`
  type Product {
    _id: ID!
    nombre: String!,
    descripcion: String,
    codigo: String!,
    foto: String!,
    precio: Float!,
    stock: Int!
  }
  input ProductInput {
    nombre: String,
    descripcion: String,
    codigo: String,
    foto: String,
    stock: Int,
    precio: Float
  }

  type User {
    id: ID!
    email: String!,
    role: String!,
    firstName: String!,
    lastName: String!,
    avatar: String!,
    currentCart: String
    address: String
    tel: Int
  }
  input UserInput {
    email: String,
    password: String,
    role: String,
    firstName: String,
    lastName: String,
    address: String,
    age: Int,
    tel: Int,
    avatar: String
  }

  type CartProduct {
    _id: ID!
    nombre: String!,
    descripcion: String,
    codigo: String!,
    foto: String!,
    precio: Float!,
    stock: Int!,
    quantity: Int!
  }

  type Query {
    getProductById(id: ID!): Product,
    getProducts: [Product],
    getUserById(id: ID!): User,
    getUserByEmail(email: String!): User,
    getCartProducts(id: ID!): [CartProduct],
  }

  type Mutation {
    createProduct(datos: ProductInput): Product,
    updateProduct(id: ID!, datos: ProductInput): Product,
    deleteProduct(id: ID!): String,
    registerUser(datos: UserInput): User,
    updateUser(id: ID!, datos: UserInput): User,
    createCart(userId: String!): ID,
    addProductToCart(idCart: ID!, idProd: String!, quantity: Int!): [CartProduct],
    deleteCart(idCart: ID!, idUser: String!): String,
    deleteCartProduct(idCart: ID!, idProd: String!): [CartProduct]
  }
`);

export default {
    graphqlOptions: {
        schema: schema,
        rootValue: {
          ...productsGraphql,
          ...usersGraphql,
          ...cartsGraphql
        },
        graphiql: true,
     }
}