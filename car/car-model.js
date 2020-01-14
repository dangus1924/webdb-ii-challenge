const db = require('../data/db-config.js');

function find() {
    return db('cars').select()
} 

function findById() {
    return db('cars').where({ id }).first()
} 

async function add(data) {
    const [id] = await db('cars').insert(data)
    return db('cars').where({id}).first()
} 

async function update(id, body) {
    await db('cars')
            .where({id})
            .update(body)

        return findById
} 

function remove() {

} 

module.exports = {
    find,
    findById,
    add,
    update,
    remove,
}