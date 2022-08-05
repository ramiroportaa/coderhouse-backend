const {Router} = require("express");

const router = Router();

router.get("/", (req, res)=>{
    const cookies = req.cookies
    res.json(cookies);
})

router.post("/", (req, res)=>{
    const name = req.body?.name;
    const value = req.body?.value;
    const time = req.body?.time;

    if (!name || !value) return res.status(400).json({ error: 'falta nombre ó valor' });

    res.cookie(name, value, time ? {maxAge: time} : null).status(200).json({ proceso: 'ok'});
})

router.delete("/:nameCookie", (req, res)=>{
    const name = req.params.nameCookie;
    const exist = req.cookies[name];

    if (!name || !exist) return res.status(400).json({ error: 'nombre no encontrado' });
    res.clearCookie(name).status(200).json({ proceso: 'ok'});
})

module.exports = router;