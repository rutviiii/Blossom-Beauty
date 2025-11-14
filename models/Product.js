const mongoose = require("mongoose");

const productSchema = new mongoose.Schema({
  name: { type: String, required: true },
  description: { type: String },
  price: { type: Number, required: true },
  category: { type: mongoose.Schema.Types.ObjectId, ref: "Category" },
  image: { type: String }, // store image filename
}, { timestamps: true });

module.exports = mongoose.model("Product", productSchema);
