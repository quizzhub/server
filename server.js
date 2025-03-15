require('module-alias/register')
const express = require('express');
require('dotenv').config();
const response = require('@view/response')
const env = process.env.NODE_ENV || 'development';
const app = express();

console.warn('\x1b[33mLưu ý: server đang ở chế độ ' + env + '\x1b[0m');

app.use(express.json()); 
app.use(express.urlencoded({ extended: true })); 

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