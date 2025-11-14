const bcrypt = require("bcrypt");
const User = require("../models/User");

// GET /login
exports.showLogin = (req, res) => {
  res.render("auth/login", { title: "Login" });
};

// POST /login
exports.loginUser = async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res.render("auth/login", { title: "Login", error: "User not found" });
    }
    const ok = await bcrypt.compare(password, user.password);
    if (!ok) {
      return res.render("auth/login", { title: "Login", error: "Invalid credentials" });
    }

    req.session.user = {
      _id: user._id,
      name: user.name,
      email: user.email,
      role: user.role
    };

    // Redirect to last attempted page or dashboard
    const redirectTo = req.session.redirectTo || (user.role === "admin" ? "/admin" : "/user");
    delete req.session.redirectTo;
    return res.redirect(redirectTo);

  } catch (e) {
    console.error(e);
    return res.render("auth/login", { title: "Login", error: "Login failed" });
  }
};

// GET /register
exports.showRegister = (req, res) => {
  res.render("auth/register", { title: "Register" });
};

// POST /register
exports.registerUser = async (req, res) => {
  const { name, email, password, role } = req.body;
  try {
    const exists = await User.findOne({ email });
    if (exists) {
      return res.render("auth/register", { title: "Register", error: "Email already in use" });
    }
    const hashed = await bcrypt.hash(password, 10);
    await User.create({ name, email, password: hashed, role: role || "user" });
    return res.redirect("/login");
  } catch (e) {
    console.error(e);
    return res.render("auth/register", { title: "Register", error: "Registration failed" });
  }
};

// GET /logout
exports.logoutUser = (req, res) => {
  req.session.destroy(() => res.redirect("/login"));
};

// GET /user
exports.userDashboard = (req, res) => {
  res.render("user/dashboard", {
    title: "User Dashboard",
    user: req.session.user || null  // ✅ allow guest access
  });
};
