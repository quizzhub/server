const express = require('express');
const router = express.Router();
require('dotenv').config();
const middleware = require('@middleware/api');
const response = require('@view/response');
const {saveCollection, getCollectionByEmail, getCollectionById} = require('@repository')
const {encrypt, decrypt} = require('@helper/aes')

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


//collection CRUD

router.get('/', async (req, res) => {
    try {
        const page = req.query.page ?? 0;
        const email = req.user.email

        const query = await getCollectionByEmail(email, page)
        const after_filter = query.map((item) => ({...item, id: encrypt(String(item.id))}))

        new response(200, {page, result: after_filter}).send(res)
    } catch(e) {
        new response(400, e.message).send(res)
    }
});

router.get('/:id', async (req, res) => {
    try {
        let { id } = req.params;
        id = decrypt(id)
        
        const result = await getCollectionById(id)
        result.id = encrypt(id)

        new response(200, result).send(res)
    } catch(e) {
        new response(400, e.message).send(res)
    }
});

module.exports = router;
