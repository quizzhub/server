const { buildSchema } = require("graphql");

const typeDefs = buildSchema(`#graphql
    type User {
        email: String
        role: String
        display_name: String
        collections(page: Int): [Collection]
    }
    type Collection {
        id: String
        owner_email: String
        c_name: String
        c_description: String
        subjects(page: Int): [Subject]
    }
    type Subject {
        id: String
        collection_id: String
        s_name: String
        s_description: String
    }
    type Query {
        user: User
        collection(id: String!): Collection
    }
    type Mutation {
        createCollection(c_name: String!, c_description: String!): String
        deleteCollection(id: String!): String

        createSubject(id: String!, s_name:String!, s_description:String!): String
        deleteSubject(id:String!):String
    }
  `);

module.exports = typeDefs