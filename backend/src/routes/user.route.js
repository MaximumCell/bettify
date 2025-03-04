import { Router } from "express";
import { protectRoute } from "../middleware/auth.middleware.js";
import { getAllUser, getMessages } from "../controller/user.controller.js";

const router = Router();

router.get("/",protectRoute, getAllUser);
router.get("/messages/:userId", protectRoute, getMessages)

export default router;
