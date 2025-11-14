const express = require("express");
const path = require("path");
const dotenv = require("dotenv");
const session = require("express-session");
const MongoStore = require("connect-mongo");
const expressLayouts = require("express-ejs-layouts");
const mongoose = require("mongoose");

dotenv.config();

const authRoutes = require("./routes/authRoutes");
const adminRoutes = require("./routes/adminRoutes");

const app = express();

// DB
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log("✅ MongoDB connected"))
  .catch(err => console.error("❌ MongoDB error:", err));

// Views
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));
app.use(expressLayouts);
app.set("layout", "layouts/layout");

// Static & body parser
app.use(express.static(path.join(__dirname, "public")));
app.use(express.urlencoded({ extended: true }));

// Session
app.use(session({
  secret: process.env.SESSION_SECRET || "fallbacksecret",
  resave: false,
  saveUninitialized: false,
  store: MongoStore.create({ mongoUrl: process.env.MONGO_URI }),
  cookie: { maxAge: 1000 * 60 * 60 }
}));

// locals
app.use((req, res, next) => {
  res.locals.user = req.session.user || null;
  res.locals.title = "Blossom Beauty";
  next();
});


// Routes
app.use("/admin", adminRoutes);
app.use("/", authRoutes);

// Root must be last so it doesn’t get overridden
app.get("/", (req, res) => {
  res.render("index", { title: "Home" });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () =>
  console.log(`🚀 Server running at http://localhost:${PORT}`)
);

const categoryRoutes = require("./routes/categoryRoutes");
app.use("/admin/categories", categoryRoutes);

const productRoutes = require("./routes/productRoutes");
app.use("/admin/products", productRoutes);

const userRoutes = require("./routes/userRoutes");
app.use("/user", userRoutes);

// Serve static files
app.use(express.static("public"));
app.use("/uploads", express.static("uploads"));

const cartRoutes = require("./routes/cartRoutes");
app.use("/cart", cartRoutes);

const orderRoutes = require("./routes/orderRoutes");
app.use("/orders", orderRoutes);

const adminOrderRoutes = require("./routes/adminOrderRoutes");
app.use("/admin/orders", adminOrderRoutes);

const wishlistRoutes = require("./routes/wishlistRoutes");
app.use("/wishlist", wishlistRoutes);

