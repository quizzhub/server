require('module-alias/register')
const express = require('express');
require('dotenv').config();
const response = require('@view/response')

const app = express();

app.use((req, res, next) => {
    res.type("application/json");
    next();
});

// init router
const router = require('@router/router')

router.forEach(item => {
    console.log(`Nạp router: ${item.prefix}`)
    app.use(item.prefix, item.router)
});

app.use((req, res) => {
    new response(404).send(res)
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT} \n------------------------------------\n`));