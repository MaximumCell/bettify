import { Router } from "express";
import { checkAdmin, createAlbum, createSong, deleteAlbum, deleteSong } from "../controller/admin.controller.js";
import { protectRoute, requireAdmin } from "../middleware/auth.middleware.js";

const router = Router();

router.use(protectRoute, requireAdmin);

router.get("/check", checkAdmin);

router.post("/songs",  createSong);
router.delete("/songs/:id",  deleteSong);


router.post("/album",  createAlbum);
router.delete("/album/:id",  deleteAlbum);

export default router;
