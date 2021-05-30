const express = require("express");
const router = express.Router();

const productsController = require("../controllers/productsController");

router.post("", productsController.storeProduct);
router.get("", productsController.getAllProducts);
router.get("/:id", productsController.getProductById);
router.delete("/:id", productsController.deleteProduct);
router.get("/search/:searchText", productsController.searchProducts);

module.exports = router;
