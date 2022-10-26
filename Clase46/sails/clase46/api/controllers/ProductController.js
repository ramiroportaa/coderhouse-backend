/**
 * ProductController
 *
 * @description :: Server-side actions for handling incoming requests.
 * @help        :: See https://sailsjs.com/docs/concepts/actions
 */
const WSresponse = require("../libs/WSresponse");

module.exports = {
  getAll: async (req, res) => {
    try {
      const data = await Product.find();
      res.status(200).json(new WSresponse(data, "success"));
    } catch (error) {
      res.status(error.status).json(new WSresponse(null, error.message, true));
    }
  },
  getOne: async (req, res) => {
    try {
      const idProd = req.params.id;
      const data = await Product.findOne(idProd);
      if (!data) return res.status(404).json(new WSresponse(null, "No product with id:" + idProd))
      res.status(200).json(new WSresponse(data, "success"));
    } catch (error) {
      res.status(error.status).json(new WSresponse(null, error.message, true));
    }
  },
};
