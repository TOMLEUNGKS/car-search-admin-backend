const knex = require('../connection');

function getAllModels() {
    return knex('car_models')
        .select('*');
}

async function getSingleModel(id) {
    const result = await knex('car_models')
        .select('*')
        .where({ modelID: parseInt(id) });
    return result[0]
}


async function addModel(model) {
    console.log(model);
    try {

        const result = await knex('car_models')
            .insert(model)
            .returning('*')
        return { result }
    } catch (err) {
        console.log(err.message);
        return { err: err.message }
    }
}

function updateModel(id, model) {
    return knex('car_models')
        .update(model)
        .where({ modelID: parseInt(id) })
        .returning('*');
}
function deleteModel(id) {
    return knex('car_models')
        .del()
        .where({ modelID: parseInt(id) })
        .returning('*');
}

module.exports = {
    getAllModels,
    getSingleModel,
    addModel,
    updateModel,
    deleteModel
};