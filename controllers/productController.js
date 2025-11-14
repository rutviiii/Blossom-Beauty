const Product = require("../models/Product");
const Category = require("../models/Category");

// Show all products
exports.getAllProducts = async (req, res) => {
  try {
    const products = await Product.find().populate("category");
    res.render("admin/products/index", {
      title: "Manage Products",
      products,
      user: req.session.user,
    });
  } catch (err) {
    console.error(err);
    res.redirect("/admin");
  }
};

// Show add product form
exports.showAddForm = async (req, res) => {
  try {
    const categories = await Category.find();
    res.render("admin/products/add", {
      title: "Add Product",
      categories,
      user: req.session.user,
    });
  } catch (err) {
    console.error(err);
    res.redirect("/admin/products");
  }
};

// Handle add product
exports.addProduct = async (req, res) => {
  try {
    const { name, price, category, description } = req.body;
    const image = req.file ? `/uploads/products/${req.file.filename}` : null;

    const product = new Product({
      name,
      price,
      category,
      description,
      image,
    });

    await product.save();
    res.redirect("/admin/products");
  } catch (err) {
    console.error(err);
    res.redirect("/admin/products");
  }
};

// Show edit form
exports.showEditForm = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    const categories = await Category.find();
    if (!product) return res.redirect("/admin/products");

    res.render("admin/products/edit", {
      title: "Edit Product",
      product,
      categories,
      user: req.session.user,
    });
  } catch (err) {
    console.error(err);
    res.redirect("/admin/products");
  }
};

// Handle edit
exports.updateProduct = async (req, res) => {
  try {
    const { name, price, category, description } = req.body;
    const updateData = { name, price, category, description };

    if (req.file) {
      updateData.image = `/uploads/products/${req.file.filename}`;
    }

    await Product.findByIdAndUpdate(req.params.id, updateData);
    res.redirect("/admin/products");
  } catch (err) {
    console.error(err);
    res.redirect("/admin/products");
  }
};

// Delete product
exports.deleteProduct = async (req, res) => {
  try {
    await Product.findByIdAndDelete(req.params.id);
    res.redirect("/admin/products");
  } catch (err) {
    console.error(err);
    res.redirect("/admin/products");
  }
};

exports.createProduct = async (req, res) => {
  try {
    const { name, description, price, category } = req.body;
    const image = req.file ? "/uploads/" + req.file.filename : null;

    const newProduct = new Product({
      name,
      description,
      price,
      category,
      image
    });

    await newProduct.save();
    res.redirect("/admin/products");
  } catch (err) {
    console.error(err);
    res.redirect("/admin/products");
  }
};