import jwt from "jsonwebtoken";

function adminAuth(req, res, next) {
  const authHeader = req.header("Authorization");

  // Expect header: "Authorization: Bearer <token>"
  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return res.status(401).json({ message: "Unauthorized: missing token" });
  }

  const token = authHeader.split(" ")[1];

  try {
    // jwt.verify throws if the token is expired, tampered, or signed with wrong secret
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    if (decoded.role !== "admin") {
      return res.status(403).json({ message: "Forbidden" });
    }

    next();
  } catch (err) {
    return res.status(401).json({ message: "Unauthorized: invalid or expired token" });
  }
}

export default adminAuth;
