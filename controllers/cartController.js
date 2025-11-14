const Cart = require("../models/Cart");
const Product = require("../models/Product");

// Show Cart
exports.getCart = async (req, res) => {
  try {
    const cart = await Cart.findOne({ user: req.session.user._id }).populate("items.product");
    res.render("user/cart", { title: "My Cart", cart });
  } catch (err) {
    console.error(err);
    res.redirect("/user/products");
  }
};
// Add to Cart
exports.addToCart = async (req, res) => {
  try {
    const productId = req.params.id;
    let cart = await Cart.findOne({ user: req.session.user._id });

    if (!cart) {
      cart = new Cart({ user: req.session.user._id, items: [] });
    }

    const itemIndex = cart.items.findIndex(i => i.product.toString() === productId);

    if (itemIndex > -1) {
      cart.items[itemIndex].quantity += 1;
    } else {
      cart.items.push({ product: productId, quantity: 1 });
    }

    await cart.save();
    res.redirect("/cart");
  } catch (err) {
    console.error(err);
    res.redirect("/user/products");
  }
};

// Remove item
exports.removeFromCart = async (req, res) => {
  try {
    const productId = req.params.id;
    let cart = await Cart.findOne({ user: req.session.user._id });

    if (cart) {
      cart.items = cart.items.filter(i => i.product.toString() !== productId);
      await cart.save();
    }
    res.redirect("/cart");
  } catch (err) {
    console.error(err);
    res.redirect("/cart");
  }
};
