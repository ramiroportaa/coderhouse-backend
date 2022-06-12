const express = require("express");
const router = express.Router();
const productsController = require("../controllers/productsController")

router.get("/", productsController.getAll);
router.get("/:id", productsController.getById);
router.post("/", productsController.add);
router.put("/:id", productsController.update);
router.delete("/:id", productsController.deleteById);

module.exports = router;