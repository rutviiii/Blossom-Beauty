exports.ensureAuth = (req, res, next) => {
  if (req.session.user) {
    return next();
  }
  // Save the last page (or action)
  req.session.redirectTo = req.originalUrl;
  return res.redirect("/login");
};


exports.ensureAdmin = (req, res, next) => {
  if (!req.session.user) return res.redirect("/login");
  if (req.session.user.role !== "admin") return res.redirect("/user");
  next();
};
