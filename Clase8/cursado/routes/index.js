const {Router} = require("express");

const router = Router();

const mascotas = [];
const personas = [];

router.get("/mascotas", (req, res) => {
    res.json(mascotas);
})
router.post("/mascotas", (req, res) => {
    mascotas.push(req.body);
    res.sendStatus(201);
})

router.get("/personas", (req, res) => {
    res.json(personas);
})
router.post("/personas", (req, res) => {
    personas.push(req.body);
    res.sendStatus(201);
})

module.exports = router;