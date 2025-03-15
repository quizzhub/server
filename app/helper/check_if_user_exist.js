const sequelize = require('@config/db_connect')
require('dotenv').config(); 
const { getUserByEmail, saveUser } = require('@repository')
const NotFound = require('@exception/notfound')

const env = process.env.NODE_ENV || 'development';

async function foo(email) {
    const results = await getUserByEmail(email)

    if (results) {
        console.log('User found:', email);
    } else {
        await saveUser(email)
        console.log(`User ${email} not found, creating new user....`);
    }
}

module.exports = foo