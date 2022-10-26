const WSresponse = require("../libs/WSresponse");

module.exports = (req, res, next) =>{
    if(req.isAuthenticated()) return next();
    res.status(401).json(new WSresponse(null, 'Debes iniciar sesión para acceder a esta ruta'));
}