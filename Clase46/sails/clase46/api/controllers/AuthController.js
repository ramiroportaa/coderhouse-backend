/**
 * AuthController
 *
 * @description :: Server-side actions for handling incoming requests.
 * @help        :: See https://sailsjs.com/docs/concepts/actions
 */

 const WSresponse = require("../libs/WSresponse");

module.exports = {
  login: async (req, res) =>{
    if (req.isAuthenticated()) return res.status(200).json(new WSresponse(req.user, 'user logged in successfully'));
  },
  logout: async (req, res) =>{
    if (req.isAuthenticated()){
        const name = req.user.firstName;
        req.logout({}, err => err);
        return res.status(200).json(new WSresponse(name, 'logout success'));
    };

    res.json(new WSresponse(null, 'debes iniciar sesión para cerrarla'));
  },
  fail: async (req, res) =>{
    res.status(401).json(new WSresponse(null, 'Error, email o password incorrectos'));
  },

};

