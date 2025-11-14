const Wishlist = require("../models/Wishlist");
const Product = require("../models/Product");

// Show user's wishlist
exports.getWishlist = async (req, res) => {
  try {
    let wishlist = await Wishlist.findOne({ user: req.session.user._id }).populate("products");
    if (!wishlist) wishlist = { products: [] };
    res.render("user/wishlist", {
      title: "My Wishlist",
      user: req.session.user,
      wishlist
    });
  } catch (err) {
    console.error(err);
    res.redirect("/user/products");
  }
};

// Add product to wishlist
exports.addToWishlist = async (req, res) => {
  try {
    const productId = req.params.productId;
    let wishlist = await Wishlist.findOne({ user: req.session.user._id });
    if (!wishlist) {
      wishlist = await Wishlist.create({ user: req.session.user._id, products: [productId] });
    } else {
      if (!wishlist.products.includes(productId)) wishlist.products.push(productId);
      await wishlist.save();
    }
    res.redirect("/wishlist");
  } catch (err) {
    console.error(err);
    res.redirect("/user/products");
  }
};

// Remove product from wishlist
exports.removeFromWishlist = async (req, res) => {
  try {
    const productId = req.params.productId;
    const wishlist = await Wishlist.findOne({ user: req.session.user._id });
    if (wishlist) {
      wishlist.products = wishlist.products.filter(p => p.toString() !== productId);
      await wishlist.save();
    }
    res.redirect("/wishlist");
  } catch (err) {
    console.error(err);
    res.redirect("/wishlist");
  }
};
