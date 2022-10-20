import usersService from "../services/users.service.js";
//Funciones que llaman a los services para obtener y devolver la data segun el schema de graphql.
const getUserById = async ({ id }) => {
  try {
    const user = await usersService.getById(id);
    return user;
  } catch (error) {
    throw new Error(error.message);
  }
};

const getUserByEmail = async ({ email }) => {
  try {
    const user = await usersService.getByEmail(email);
    return user;
  } catch (error) {
    throw new Error(error.message);
  }
};

const registerUser = async ({ datos }) => {
  try {
    const newUser = await usersService.registerUser(datos);
    return newUser;
  } catch (error) {
    throw new Error(error.message);
  }
};

const updateUser = async ({ id, datos }) => {
  try {
    await usersService.updateById(id, datos);
    const updatedUser = await usersService.getById(id);
    return updatedUser;
  } catch (error) {
    throw new Error(error.message);
  }
};

export default {
    getUserById,
    getUserByEmail,
    registerUser,
    updateUser
}