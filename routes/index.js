const express = require("express");
const productController = require("../controller/product");
const router = express.Router();
const validateDto = require("../middleware/validate-dto");
const productDto = require("../dto/product");

router.use(express.json());

router.get("/product", productController.getAllProduct);

router.get("/product/:id", productController.getProduct);

router.post(
  "/product",
  validateDto(productDto),
  productController.createProduct
);

router.put("/product/:id", productController.updateProduct);

router.delete("/product/:id", productController.deleteProduct);

module.exports = router;
