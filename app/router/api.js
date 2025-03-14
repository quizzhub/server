const express = require('express');
const router = express.Router();
require('dotenv').config();
const middleware = require('@middleware/api');
const response = require('@view/response');

router.use(middleware)
router.get('/', async (req, res) => {
    new response(200, req.user).send(res)
});

module.exports = router;
