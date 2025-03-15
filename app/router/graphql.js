const { graphqlHTTP } = require("express-graphql");
const { makeExecutableSchema } = require('@graphql-tools/schema');
const middleware = require('@middleware/api');
const express = require('express');
const { Query } = require("pg");
const router = express.Router();



// import graphql module
const resolvers = require('@graphql/resolver')
const typeDefs = require('@graphql/schema')

const schema = makeExecutableSchema({ typeDefs, resolvers });

router.use(middleware)
router.use("/", graphqlHTTP((req) => ({
    schema,
    graphiql: true,
    context: { user: req.user } 
})));   



module.exports = router
