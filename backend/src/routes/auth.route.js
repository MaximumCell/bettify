import { Router } from "express";
import { authCallBack } from "../controller/auth.controller.js";



const router = Router();

router.get("/callback", authCallBack)



export default router;