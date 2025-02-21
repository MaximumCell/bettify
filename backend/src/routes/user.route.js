import { Router } from "express";
import { protectRoute } from "../middleware/auth.middleware.js";

const router = Router();

router.get("/like",protectRoute, (req, res) => {
  req.auth.userId;
  res.send("User Route wiht get method");
});

export default router;
