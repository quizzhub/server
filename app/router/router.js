const auth = require('@router/auth')
const api = require('@router/api')

const arr = [ 
    {
        prefix: "/auth",
        router: auth
    }, 
    {
        prefix: "/api",
        router: api
    }
]

module.exports = arr