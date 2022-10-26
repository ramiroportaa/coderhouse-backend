/**
 * UsersController
 *
 * @description :: Server-side actions for handling incoming requests.
 * @help        :: See https://sailsjs.com/docs/concepts/actions
 */

const bcrypt = require("bcrypt");
const UserDTO = require("../dtos/user.DTO");
const WSresponse = require("../libs/WSresponse");

const createHash = (password) => {
  return bcrypt.hashSync(password, bcrypt.genSaltSync(10));
};

module.exports = {
  _config: {
    actions: false,
    shortcuts: false,
    rest: false,
  },
  getById: async (req, res) => {
    try {
      const idUser = req.params.id;
      let data;
      if (idUser === "anonimo") {
        data = new UserDTO();
      } else {
        data = await User.findOne(idUser);
        if (!data) throw { message: `no user with ID: ${idUser}`, status: 404 };
        data = new UserDTO(data);
      }
      res.status(200).json(new WSresponse(data, "success"));
    } catch (error) {
      res.status(error.status).json(new WSresponse(null, error.message, true));
    }
  },
  getByEmail: async (req, res) => {
    try {
      const email = req.query.email || null;
      let data;
      data = await User.findOne({ where: {email} });
      if (!data) throw { message: `no user with Email: ${email}`, status: 404 };
      data = new UserDTO(data);
      res.status(200).json(new WSresponse(data, "success"));
    } catch (error) {
      res.status(error.status).json(new WSresponse(null, error.message, true));
    }
  },
  registerUser: async (req, res) => {
    try {
      const newUser = req.body;
      newUser.password = createHash(newUser.password);
      let data;
      try {
        data = await User.create(newUser).fetch();
      } catch (error) {
        throw {
          message: "El usuario o el mail ya están registrados",
          status: 403,
        };
      }

      res
        .status(201)
        .json(new WSresponse(new UserDTO(data), "User created successfully"));
    } catch (error) {
      res.status(error.status).json(new WSresponse(null, error.message, true));
    }
  },
  updateById: async (req, res) => {
    try {
      const idUser = req.params.id;
      const newDataObj = req.body;

      let dataToUpdate = {};
      const userArray = Object.entries(newDataObj);
      userArray.forEach((entries) => {
        if (entries[1]) {
          dataToUpdate[entries[0]] = entries[1];
        }
      });

      let updatedUser;
      try {
        updatedUser = await User.updateOne(idUser).set(dataToUpdate);
      } catch (error) {
        throw {
          message: "Error updating user",
          status: 403,
        };
      }

      res
        .status(201)
        .json(
          new WSresponse(new UserDTO(updatedUser), "user updated successfully")
        );
    } catch (error) {
      return res
        .status(error.status)
        .json(new WSresponse(null, error.message, true));
    }
  },
  deleteById: async (req, res) => {
    try {
      const idUser = req.params.id;
      let data;
      if (idUser === "anonimo") {
        throw { message: `This user can't be deleted`, status: 403 };
      } else {
        data = await User.destroyOne(idUser);
        if (!data) throw { message: `no user with ID: ${idUser}`, status: 404 };
        data = new UserDTO(data);
      }
      res.status(200).json(new WSresponse(data, "user deleted successfully"));
    } catch (error) {
      res.status(error.status).json(new WSresponse(null, error.message, true));
    }
  },
};
