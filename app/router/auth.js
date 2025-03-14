const express = require('express');
const router = express.Router();
require('dotenv').config();

router.get('/login', async (req, res) => {
    const googleAuthURL = `https://accounts.google.com/o/oauth2/auth
      ?client_id=${process.env.GOOGLE_CLIENT_ID}
      &redirect_uri=${process.env.CALLBACK_URL}
      &response_type=code
      &scope=openid%20email%20profile
      &access_type=offline
      &prompt=consent`.replace(/\s+/g, '');

    res.redirect(googleAuthURL);
});

router.get('/google/callback', async (req, res) => {
    try {
        const code = req.query.code;

        if (!code) {
            return res.status(400).json({ error: 'Code is missing' });
        }

        const fetchRes = await fetch('https://oauth2.googleapis.com/token', {
            method: 'POST',
            headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
            body: new URLSearchParams({
                client_id: process.env.GOOGLE_CLIENT_ID,
                client_secret: process.env.GOOGLE_CLIENT_SECRET,
                redirect_uri: process.env.CALLBACK_URL,
                grant_type: 'authorization_code',
                code: code
            })
        })

        const tokenData = await fetchRes.json();

        res.json({ message: 'Code received', response: tokenData });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

module.exports = router;
