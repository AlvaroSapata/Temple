function isAdminBack(req, res, next) {
  const { payload } = req; 
  if (payload.role === "admin") {
    next();
  } else {
    res.status(401).json("No es admin");
  }
}

module.exports = isAdminBack;
