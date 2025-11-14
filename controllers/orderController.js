const Order = require("../models/Order");
const Cart = require("../models/Cart");

// Checkout - place an order
exports.checkout = async (req, res) => {
  try {
    const cart = await Cart.findOne({ user: req.session.user._id }).populate("items.product");

    if (!cart || cart.items.length === 0) {
      return res.redirect("/cart");
    }

    const totalAmount = cart.items.reduce((sum, item) => {
      return sum + item.product.price * item.quantity;
    }, 0);

    const { fullName, address, city, state, postalCode, phone } = req.body;
    
    const newOrder = new Order({
      user: req.session.user._id,
      items: cart.items.map(i => ({
        product: i.product._id,
        quantity: i.quantity
      })),
      totalAmount,
      shipping: {
        fullName,
        address,
        city,
        state,
        postalCode,
        phone
      }
    });

    await newOrder.save();

    // clear cart after placing order
    cart.items = [];
    await cart.save();

    res.redirect("/orders");
  } catch (err) {
    console.error(err);
    res.redirect("/cart");
  }
};

// Show all user orders
exports.getOrders = async (req, res) => {
  try {
    const orders = await Order.find({ user: req.session.user._id })
      .populate("items.product")
      .sort({ createdAt: -1 });

    res.render("user/orders", {
      title: "My Orders",
      user: req.session.user,
      orders
    });
  } catch (err) {
    console.error(err);
    res.redirect("/cart");
  }
};

// Show logged-in user's orders
exports.getUserOrders = async (req, res) => {
  try {
    const orders = await Order.find({ user: req.session.user._id })
      .populate("items.product")
      .sort({ createdAt: -1 });

    res.render("orders/userOrders", {
      title: "My Orders",
      orders,
      user: req.session.user
    });
  } catch (err) {
    console.error(err);
    res.redirect("/");
  }
};
// Show a single order details page
exports.getOrderDetails = async (req, res) => {
  try {
    const order = await Order.findOne({
      _id: req.params.id,
      user: req.session.user._id, // security: user can only see their own orders
    }).populate("items.product");

    if (!order) {
      return res.redirect("/orders/my-orders");
    }

    res.render("orders/orderDetails", {
      title: "Order Details",
      order,
      user: req.session.user
    });
  } catch (err) {
    console.error(err);
    res.redirect("/orders/my-orders");
  }
};

// Show Shipping Form
exports.showShippingForm = async (req, res) => {
  try {
    const cart = await Cart.findOne({ user: req.session.user._id }).populate("items.product");

    if (!cart || cart.items.length === 0) {
      return res.redirect("/cart");
    }

    res.render("user/shipping", {
      title: "Shipping Information",
      user: req.session.user,
      cart
    });
  } catch (err) {
    console.error(err);
    res.redirect("/cart");
  }
};

// Handle Shipping Form & Place Order
exports.placeOrder = async (req, res) => {
  try {
    const cart = await Cart.findOne({ user: req.session.user._id }).populate("items.product");

    if (!cart || cart.items.length === 0) {
      return res.redirect("/cart");
    }

    const totalAmount = cart.items.reduce((sum, item) => {
      return sum + item.product.price * item.quantity;
    }, 0);

    const newOrder = new Order({
      user: req.session.user._id,
      items: cart.items.map(i => ({
        product: i.product._id,
        quantity: i.quantity
      })),
      totalAmount,
      shipping: {
        fullName: req.body.fullName,
        address: req.body.address,
        city: req.body.city,
        state: req.body.state,
        postalCode: req.body.postalCode,
        phone: req.body.phone
      }
    });

    await newOrder.save();

    // clear cart
    cart.items = [];
    await cart.save();

    res.redirect("/orders");
  } catch (err) {
    console.error(err);
    res.redirect("/cart");
  }
};
