const Category = require("../models/Category");

// Show all categories
exports.getAllCategories = async (req, res) => {
  try {
    const categories = await Category.find();
    res.render("admin/categories/index", {
      layout: "layouts/layout",
      title: "Manage Categories",
      user: req.session.user,
      categories
    });
  } catch (err) {
    console.error(err);
    res.redirect("/admin/dashboard");
  }
};

// Show add category form
exports.showAddCategoryForm = (req, res) => {
  res.render("admin/categories/add", {
    layout: "layouts/layout",
    title: "Add Category",
    user: req.session.user
  });
};

// Handle add category
exports.addCategory = async (req, res) => {
  const { name, description } = req.body;
  try {
    await Category.create({ name, description });
    res.redirect("/admin/categories");
  } catch (err) {
    console.error(err);
    res.redirect("/admin/categories/add");
  }
};

// Show edit form
exports.showEditCategoryForm = async (req, res) => {
  try {
    const category = await Category.findById(req.params.id);
    res.render("admin/categories/edit", {
      layout: "layouts/layout",
      title: "Edit Category",
      user: req.session.user,
      category
    });
  } catch (err) {
    console.error(err);
    res.redirect("/admin/categories");
  }
};

// Handle edit
exports.updateCategory = async (req, res) => {
  const { name, description } = req.body;
  try {
    await Category.findByIdAndUpdate(req.params.id, { name, description });
    res.redirect("/admin/categories");
  } catch (err) {
    console.error(err);
    res.redirect("/admin/categories");
  }
};

// Delete category
exports.deleteCategory = async (req, res) => {
  try {
    await Category.findByIdAndDelete(req.params.id);
    res.redirect("/admin/categories");
  } catch (err) {
    console.error(err);
    res.redirect("/admin/categories");
  }
};
