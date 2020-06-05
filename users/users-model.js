const db = require('../data/dbConfig')

module.exports = {
    add,
    find,
    findBy,
    findById
}

function find() {
    return db('users')
        .select('id', "username", 'password')
        .where({ id })
        .first()
}

function findBy(filter) {
    return db('users').where(filter)
}

async function add(user) {
    return db('users')
        .insert(user, 'id')
        .then(ids => {
            console.log(ids, 'Hello New Person!')
            const [id] = ids
            return getById(id)
        })
}

function findById(id) {
    return db("users").where({ id }).first()
}
