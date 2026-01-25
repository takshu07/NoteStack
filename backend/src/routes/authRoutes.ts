import { Router } from "express";
import { authMiddleware } from "../middleware/authMiddleware.js";
import { Login, Register, Logout } from "../controller/authController.js";

const router = Router();

router.post("/login", Login);
router.post("/register", Register);
router.post("/logout", Logout);

// ✅ used by checkAuthThunk
router.get("/me", authMiddleware, (req, res) => {
  res.status(200).json({
    user: req.user,
  });
});

export default router;
