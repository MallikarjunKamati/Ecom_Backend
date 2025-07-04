const express = require("express");
const { getAllProducts, getProductById, updateProduct, deleteProduct, createProduct   } = require("../controllers/productController");
const validateProduct = require("../utils/validateProduct");
const { isAuth, isAdmin } = require("../middlewares/authMiddlewares");

const productRoutes = express.Router();

productRoutes.post("/",validateProduct, createProduct);
productRoutes.get("/", isAuth, getAllProducts);
productRoutes.get("/:id", isAuth, getProductById);
productRoutes.put("/:id", isAuth, isAdmin, validateProduct, updateProduct);
productRoutes.delete("/:id", isAuth, isAdmin, deleteProduct);

module.exports = productRoutes;