import { Router } from "express";

const router = Router();

router.get('/', (req, res) => {
    res.send('song Route wiht get method')
})

export default router;