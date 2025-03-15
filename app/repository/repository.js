require('dotenv').config();
const { Sequelize } = require('sequelize');
const sequelize = require('@config/db_connect')
const {
    encrypt,
    decrypt
} = require('@helper/aes')

const env = process.env.NODE_ENV || 'development';


// user

async function getUserByEmail(email) {
    const res = await sequelize.query(`SELECT * FROM ${env}.user WHERE email = :email`, {
        replacements: { email: email },
        type: sequelize.QueryTypes.SELECT
    });

    return res[0]
}

async function saveUser(email) {
    return await sequelize.query(`INSERT INTO ${env}.user (email, display_name) VALUES (:email, :display_name)`, {
        replacements: { email: email, display_name: email.split('@')[0] },
        type: sequelize.QueryTypes.INSERT
    });
}

// collection
async function saveCollection(email, name, description) {
    const [res] = await sequelize.query(
        `INSERT INTO ${env}.collection(owner_email, c_name, c_description)
        VALUES (:email, :name, :description)`, 
    {
        replacements: { email: email, name: name, description: description},
        type: sequelize.QueryTypes.INSERT
    })

    return res
}

async function getCollectionByEmail(email, page) {
    const offset = page*5
    
    const res = await sequelize.query(
        `
        SELECT * FROM ${env}.collection
        WHERE owner_email = :email
        LIMIT 5 OFFSET :offset
        `, 
    {
        replacements: { offset: offset, email: email},
        type: sequelize.QueryTypes.SELECT
    })

    return res.map((item) => ({...item, id: encrypt(String(item.id))}))
}

async function getCollectionById(id, email) {    
    id = decrypt(id)

    const res = await sequelize.query(
        `
        SELECT * FROM ${env}.collection
        WHERE id = :id and owner_email = :email
        `, 
    {
        replacements: { id: id, email: email},
        type: sequelize.QueryTypes.SELECT
    })

    res[0].id = encrypt(String(res[0].id))

    return res[0]
}

async function deleteCollection(id, email) {    
    id = decrypt(String(id))

    const res = await sequelize.query(
        `
            DELETE FROM ${env}.collection
            WHERE id = :id
            AND EXISTS 
            (
                select 1
                from (
                    select email from ${env}.user
                    where email = :email
                ) as a
                left join ${env}.collection as b
                on a.email = b.owner_email
                where id = :id
            )
        `, 
    {
        replacements: { id: id, email: email},
        type: sequelize.QueryTypes.DELETE
    })

    return res
}

// subject
async function saveQuizzSubject(id, email, s_name, s_description) {
    id = decrypt(id)

    const res = await sequelize.query(
        `
            INSERT INTO ${env}.quizz_subject (collection_id, s_name, s_description)
            SELECT :id, :s_name, :s_description
            WHERE EXISTS
            (
                select 1
                from (
                    select email from ${env}.user
                    where email = :email
                ) as a
                left join ${env}.collection as b
                on a.email = b.owner_email
                where id = :id
            )
        `, 
    {
        replacements: { id: id, s_name: s_name, s_description:s_description, email:email},
        type: sequelize.QueryTypes.INSERT
    })

    return res
}

async function deleteSubjectById(id, email) {
    const res = await sequelize.query(
        `   
            DELETE FROM ${env}.quizz_subject
            WHERE id = :id AND
            EXISTS (
                select 1
                from (
                    select email from ${env}.user
                    where email = :email
                ) as a
                join ${env}.collection as b
                on a.email = b.owner_email
                join ${env}.quizz_subject as c
                on c.collection_id = b.id
                where c.id = :id
            )
        `, 
    {
        replacements: { id: id, email:email},
        type: sequelize.QueryTypes.DELETE
    })

    return res
}

async function getSubjectByCollectionId(enscrypt_id, page) {
    const id = decrypt(enscrypt_id)
    const offset = page*5

    const res = await sequelize.query(
        `
            select * from ${env}.quizz_subject
            where collection_id = :id
            LIMIT 5 OFFSET :offset
        `, 
    {
        replacements: { id: id, offset: offset},
        type: sequelize.QueryTypes.SELECT
    })

    return res
}

module.exports = {
    getUserByEmail,
    saveUser,
    saveCollection,
    getCollectionByEmail,
    getCollectionById,

    saveQuizzSubject,
    deleteCollection,
    getSubjectByCollectionId,
    deleteSubjectById
}