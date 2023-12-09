const express = require("express");
const router = express.Router();

const {create} = require("../controllers/LoadTesterController");

/**
 * @api {post} /load-tests
 * @apiName Create Load Test
 * @apiGroup Load Test
 */
router.post("/", (req, res) => {
    return create(req, res)
});


module.exports = router;