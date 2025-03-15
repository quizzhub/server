const express = require('express');
require('dotenv').config();
const middleware = require('@middleware/api');
const response = require('@view/response');
const {saveCollection, getCollectionByEmail, getCollectionById} = require('@repository')
const {encrypt, decrypt} = require('@helper/aes')
const router = express.Router();

router.use(middleware)

router.post('/', async (req, res) => {
    try {
        const email = req.user.email
        const body = req.body

        const result = await saveCollection(email, body.name, body.description)

        new response(200, "success").send(res)
    } catch(e) {
        new response(400, e.message).send(res)
    }
});

module.exports = router;
