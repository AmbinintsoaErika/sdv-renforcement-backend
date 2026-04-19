function validateRole(roles) {
  return function (req, res, next) {
    const userRole = req.user.role;

    if (roles.includes(userRole)) {
      next(); 
    } else {
      res.status(403).json({ message: 'Forbidden: Insufficient permissions' });
    }
  };
}

module.exports = validateRole;