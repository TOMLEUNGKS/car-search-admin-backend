const knex = require('../connection');

function getAllSpecs(limit) {
    let knex_limit = limit || 1000000
    return knex('car_specs')
        .limit(knex_limit)
        .select('*');
}

function getAllModelSpecs(modelID) {
    return knex('car_specs')
        .select('*').where({ modelID: parseInt(modelID) });;
}

async function getSingleSpec(id) {
    const result = await knex('car_specs')
        .select('*')
        .where({ carID: parseInt(id) });
    return result[0]
}


async function addSpec(spec) {
    console.log(spec);
    try {

        const result = await knex('car_specs')
            .insert(spec)
            .returning('*')
        return { result }
    } catch (err) {
        console.log(err.message);
        return { err: err.message }
    }
}

function updateSpec(id, spec) {
    return knex('car_specs')
        .update(spec)
        .where({ carID: parseInt(id) })
        .returning('*');
}
function deleteSpec(id) {
    return knex('car_specs')
        .del()
        .where({ carID: parseInt(id) })
        .returning('*');
}

module.exports = {
    getAllSpecs,
    getAllModelSpecs,
    getSingleSpec,
    addSpec,
    updateSpec,
    deleteSpec
};