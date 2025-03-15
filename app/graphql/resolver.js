const {
    getUserByEmail,

    getCollectionByEmail,
    saveCollection,
    getCollectionById,
    deleteCollection,
    saveQuizzSubject,

    getSubjectByCollectionId,
    deleteSubjectById
} = require('@repository')

const resolvers = {
    Query: {
        user: async (_, __, context) => {
            const email = context.user.email

            return await getUserByEmail(email)
        },
        collection: async (_, {id}, context) => {
            const email = context.user.email

            return await getCollectionById(id, email)
        }
    },
    Mutation: {
        createCollection: async (_, {c_name, c_description }, context) => {
            try {
                const email = context.user.email

                const newCollection = await saveCollection(email, c_name, c_description);
                return "success"; 
            } catch (error) {
                return error.message
            }
        },
        deleteCollection: async(_, {id}, context) => {
            const email = context.user.email

            const res = await deleteCollection(id, email)

            return `success`
        },
        createSubject: async (_, {id, s_name, s_description}, context) => {
            const email = context.user.email

            const res = await(saveQuizzSubject(id, email, s_name, s_description))

            return `successfully change ${res[1]} row(s)`
        },

        //subject
        deleteSubject: async (_, {id}, context) => {
            await deleteSubjectById(id, context.user.email)

            return `success`
        }
    },
    User: {
        collections: async (parent, {page = 0}) => {
            return await getCollectionByEmail(parent.email, page); 
        }
    },
    Collection: {
        subjects: async (parent, {page = 0}) => {
            return await getSubjectByCollectionId(parent.id, page)
        }
    }
};

module.exports = resolvers