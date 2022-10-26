const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;
const bcrypt = require("bcrypt");
const UserDTO = require('../api/dtos/user.DTO');

const isValidPassword = (password, encPassword) => {
  const isValid = bcrypt.compareSync(password, encPassword);
  return isValid;
};

passport.serializeUser( (user, done) => {
  done(null, user.email);
});
passport.deserializeUser(async (email, done) => {
  let user = await User.findOne({email});
  user = new UserDTO(user);
  done(null, user);
});

passport.use( 'login', new LocalStrategy(
    { usernameField: "email" },
    async (email, password, done) => {
      try {
        const userDB = await User.findOne({email: email.toLowerCase()});
        if (!userDB || !isValidPassword(password, userDB.password)) return done(null, false);

        let user;
        //Si el usuario no tiene carrito asignado al ingresar, se crea uno y se le asigna.
        //Luego se vuelve a obtener el usuario ahora si con su nuevo carrito asignado.
        if (!userDB.currentCart) {
          const cart = await await Cart.create({ productos: [] }).fetch();
          user = await User.updateOne(userDB.id).set({currentCart: cart.id});
          user = new UserDTO(user);
        } else {
          //Si el user ya tenia un carrito asignado, solo devolvemos el DTO del usuario que recuperamos en primera instancia.
          user = new UserDTO(userDB);
        }
        return done(null, user);
      } catch (error) {
        sails.log.debug(error)
      }
    }
  )
);

module.exports = {passport};