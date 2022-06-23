const {Router} = require("express");
const router = Router();
const { getProducts, getProduct, createProduct, updateProduct, deleteProduct } = require("../controllers/productsController");

router.get("/", getProducts);
router.get("/:id", getProduct);
router.post("/", createProduct);
router.put("/:id", updateProduct);
router.delete("/:id", deleteProduct);

module.exports = router;