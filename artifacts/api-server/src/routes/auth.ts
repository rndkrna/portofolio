import { Router } from "express";

const router = Router();

router.post("/admin/login", (req, res) => {
  const { password } = req.body;
  const adminPassword = process.env.ADMIN_PASSWORD || "admin123";

  if (password === adminPassword) {
    // Send a mock token back for authentication
    res.json({ 
      success: true, 
      token: "mock-session-token-for-elegant-portfolio-admin" 
    });
  } else {
    res.status(401).json({ 
      success: false, 
      error: "Password salah!" 
    });
  }
});

export default router;
