const auth = require('@router/auth')
const api = require('@router/api')
const collection = require('@router/collection')
const subject = require('@router/subject')
const graphql = require('@router/graphql')

const arr = [ 
    {
        prefix: "/auth",
        router: auth
    }, 
    {
        prefix: "/api",
        router: api
    }, 
    {
        prefix: "/api/collection",
        router: collection
    }, 
    {
        prefix: "/api/subject",
        router: subject
    }, 
    {
        prefix: "/graphql",
        router: graphql
    }
]

module.exports = arr