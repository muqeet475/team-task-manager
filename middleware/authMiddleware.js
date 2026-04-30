module.exports = (req, res, next) => {
  const role = req.headers.role;

  if (!role) {
    return res.status(401).json({ message: "No role provided" });
  }

  if (role !== "admin") {
    return res.status(403).json({ message: "Access denied (Admin only)" });
  }

  next();
};