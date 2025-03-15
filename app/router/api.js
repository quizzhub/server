const express = require('express');
const router = express.Router();
require('dotenv').config();
const middleware = require('@middleware/api');
const response = require('@view/response');

router.use(middleware)
router.get('/', async (req, res) => {
    try {
        const data = req.user

        new response(200, data).send(res)
    } catch(e) {
        new response(400, e.message).send(res)
        console.log(e.message)
    }
});

module.exports = router;
