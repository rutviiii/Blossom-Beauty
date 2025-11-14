const express = require("express");
const router = express.Router();
const categoryController = require("../controllers/categoryController");

// List all categories
router.get("/", categoryController.getAllCategories);

// Add category
router.get("/add", categoryController.showAddCategoryForm);
router.post("/add", categoryController.addCategory);

// Edit category
router.get("/edit/:id", categoryController.showEditCategoryForm);
router.post("/edit/:id", categoryController.updateCategory);

// Delete category
router.post("/delete/:id", categoryController.deleteCategory);

module.exports = router;
