const express = require("express");
const router = express.Router();
const {notFound} = require('../responses/APIResponse')

router.use((req, res) => {
    return notFound(req, res)
});

module.exports = router;