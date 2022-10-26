const {passport} = require('../../config/passport');

module.exports = passport.authenticate("login", {failureRedirect: '/login_error'});