const Category = require("../models/Category");
const Product = require("../models/Product");

// Show all categories and products (default all)
exports.allProducts = async (req, res) => {
  try {
    const categories = await Category.find();
    const categoryId = req.query.category; // ?category=<id>
    let products;

    if (categoryId) {
      products = await Product.find({ category: categoryId }).populate("category");
    } else {
      products = await Product.find().populate("category");
    }

    res.render("user/products", {
      title: "All Products",
      user: req.session.user || null,
      categories,
      products,
      selectedCategory: categoryId || null
    });
  } catch (err) {
    console.error(err);
    res.status(500).send("Server Error");
  }
};
