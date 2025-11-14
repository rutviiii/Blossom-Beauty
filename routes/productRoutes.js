const express = require("express");
const router = express.Router();
const multer = require("multer");
const path = require("path");
const upload = require("../middleware/upload");
const productController = require("../controllers/productController");

const { ensureAuth } = require("../middleware/auth");



// 👉 Show all products
router.get("/", productController.getAllProducts);

// 👉 Show add product form
router.get("/add", productController.showAddForm);

// 👉 Handle add product
router.post("/add", upload.single("image"), productController.addProduct);

// 👉 Show edit form
router.get("/edit/:id", productController.showEditForm);

// 👉 Handle edit product
router.post("/edit/:id", upload.single("image"), productController.updateProduct);

// 👉 Delete product
router.post("/delete/:id", productController.deleteProduct);

// Admin add product
router.post("/create", ensureAuth, upload.single("image"), productController.createProduct);

module.exports = router;
