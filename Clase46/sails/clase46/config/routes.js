/**
 * Route Mappings
 * (sails.config.routes)
 *
 * Your routes tell Sails what to do each time it receives a request.
 *
 * For more information on configuring custom routes, check out:
 * https://sailsjs.com/anatomy/config/routes-js
 */

module.exports.routes = {

  /***************************************************************************
  *                                                                          *
  * Make the view located at `views/homepage.ejs` your home page.            *
  *                                                                          *
  * (Alternatively, remove this and add an `index.html` file in your         *
  * `assets` directory)                                                      *
  *                                                                          *
  ***************************************************************************/

  '/': { view: 'pages/homepage' },


  /***************************************************************************
  *                                                                          *
  * More custom routes here...                                               *
  * (See https://sailsjs.com/config/routes for examples.)                    *
  *                                                                          *
  * If a request to a URL doesn't match any of the routes in this file, it   *
  * is matched against "shadow routes" (e.g. blueprint routes).  If it does  *
  * not match any of those, it is matched against static assets.             *
  *                                                                          *
  ***************************************************************************/

  'GET /api/user/:id': 'UserController.getById',
  'GET /api/user': 'UserController.getByEmail',
  'POST /api/user': 'UserController.registerUser',
  'PUT /api/user/:id': 'UserController.updateById',
  'DELETE /api/user/:id': 'UserController.deleteById',

  'GET /api/cart/:id/products': 'CartController.getProductsInCart',
  'POST /api/cart': 'CartController.createCart',
  'POST /api/cart/:id/products': 'CartController.addProduct',
  'DELETE /api/cart/:id/products/:id_prod': 'CartController.deleteCartProductById',
  'DELETE /api/cart/:id': 'CartController.deleteCart',

  'GET /api/product': 'ProductController.getAll',
  'GET /api/product/:id': 'ProductController.getOne',

  'GET /logout': 'AuthController.logout',
  'POST /login': 'AuthController.login',
  'GET /login_error': 'AuthController.fail',
  
};
