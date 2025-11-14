const Order = require("../models/Order");

// Show all orders (Admin Dashboard)
exports.getAllOrders = async (req, res) => {
  try {
    const orders = await Order.find()
      .populate("user")
      .populate("items.product")
      .sort({ createdAt: -1 });

    res.render("admin/orders/index", {
      title: "Manage Orders",
      user: req.session.user,
      orders
    });
  } catch (err) {
    console.error(err);
    res.redirect("/admin");
  }
};

// Update order status
exports.updateStatus = async (req, res) => {
  try {
    const orderId = req.params.id;
    const { status } = req.body;

    await Order.findByIdAndUpdate(orderId, { status });

    res.redirect("/admin/orders");
  } catch (err) {
    console.error(err);
    res.redirect("/admin/orders");
  }
};

