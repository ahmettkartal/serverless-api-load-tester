import { Router} from "express";
const router = Router();

import {create} from "../controllers/LoadTesterController"

/**
 * @api {post} /load-tests
 * @apiName Create Load Test
 * @apiGroup Load Test
 */
router.post("/", (req, res) => {
    return create(req, res)
});

export default router;