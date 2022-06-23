const {Router} = require("express");
const router = Router();
const { getForm } = require("../controllers/formController");

router.get("/", getForm);

module.exports = router;