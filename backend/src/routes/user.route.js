import { Router } from "express";
import { protectRoute } from "../middleware/auth.middleware.js";
import { getAllUser } from "../controller/user.controller.js";

const router = Router();

router.get("/",protectRoute, getAllUser);
//todo message

export default router;
