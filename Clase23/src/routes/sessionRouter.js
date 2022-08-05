const {Router} = require("express");

const router = Router();

const auth = (req, res, next)=>{
    
}

router.get("/", (req, res)=>{
    req.query.name && (req.session.name = req.query.name);
    req.session.contador = req.session.contador ?  req.session.contador + 1 : 1;
    if (req.session.contador > 1) return res.send(`${req.session.name ? req.session.name : "Usted"} ha visitado el sitio ${req.session.contador} veces`);
    res.send(`Te damos la bienvenida ${req.session.name ? req.session.name : ""}!`);
})

router.get("/olvidar", (req, res)=>{
    const name = req.session.name;
    req.session.destroy( err => {
        if (err) return res.status(500).send({ error : err });
        res.send(`Hasta luego ${name ? name : ""}`);
    })
})

module.exports = router;