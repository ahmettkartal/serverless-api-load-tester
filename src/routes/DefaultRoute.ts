import { Router} from "express";
const router = Router();

import {notFound} from '../responses/APIResponse'

router.use((req, res) => {
    return notFound(req, res)
});

export default router;