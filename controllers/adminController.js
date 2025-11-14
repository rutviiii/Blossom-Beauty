const User = require("../models/User");

// GET /admin
exports.adminDashboard = async (req, res) => {
  res.render("admin/dashboard", { title: "Admin Dashboard" });
};

// GET /admin/users
exports.adminUsers = async (req, res) => {
  const users = await User.find({}, "name email role").lean();
  res.render("admin/users", { title: "Users", users });
};
