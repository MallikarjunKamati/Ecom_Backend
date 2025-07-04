const express = require("express");
const { getAllProducts, getProductById, updateProduct, deleteProduct, createProduct   } = require("../controllers/productController");
const { validate } = require("../models/product");
const validateProduct = require("../utils/validateProduct");

const productRoutes = express.Router();

productRoutes.post("/",validateProduct, createProduct);
productRoutes.get("/",getAllProducts);
productRoutes.get("/:id", getProductById);
productRoutes.put("/:id",validateProduct, updateProduct);
productRoutes.delete("/:id", deleteProduct);

module.exports = productRoutes;