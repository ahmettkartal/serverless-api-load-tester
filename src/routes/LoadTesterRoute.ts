import {Router} from "express";

const router = Router();
import {Request, Response} from 'express';
import {body, validationResult} from "express-validator"
import {isValidJSON, isValidNumber} from "../validators/DefaultValidator"
import {create} from "../controllers/LoadTesterController"
import {validationFailed} from "../responses/APIResponse"

/**
 * @api {post} /load-tests
 * @apiName Create Load Test
 * @apiGroup Load Test
 */
router.post("/",
    [
        body("iteration").custom((value) => {
            return isValidNumber(value, false)
        }),
        body("request_data").custom((value) => {
            return isValidJSON(JSON.stringify(value), false);
        })
    ],
    (req: Request, res: Response) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return validationFailed(errors.array(), req, res)
        }
        return create(req, res)
    });

export default router;