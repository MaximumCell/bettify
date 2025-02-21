import { Router } from "express";

const router = Router();

router.get('/', (req, res) => {
    res.send('Album Route wiht get method')
})

export default router;