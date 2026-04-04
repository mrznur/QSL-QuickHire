import express from "express";
import jwt from "jsonwebtoken";

const router = express.Router();

// POST /api/auth/login
// Body: { key: "supersecret" }
// The key is compared server-side only — it never goes back to the client
router.post("/login", (req, res) => {
  const { key } = req.body;

  if (!key || key !== process.env.ADMIN_KEY) {
    return res.status(401).json({ message: "Invalid admin key" });
  }

  // Sign a JWT with a 8-hour expiry
  // JWT_SECRET is a long random string only the server knows
  // It's used to sign and verify tokens — without it, tokens can't be forged
  const token = jwt.sign(
    { role: "admin" },
    process.env.JWT_SECRET,
    { expiresIn: "8h" }
  );

  res.json({ token });
});

export default router;
