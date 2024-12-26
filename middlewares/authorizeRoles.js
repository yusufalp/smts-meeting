export function authorizeRoles(allowedRoles) {
  return (req, res, next) => {
    const { role } = req.query;

    if (!allowedRoles.includes(role)) {
      return res.status(403).json({ message: "Access denied" });
    }

    next();
  };
}

export const authorizeAdmin = authorizeRoles(["admin"]);
