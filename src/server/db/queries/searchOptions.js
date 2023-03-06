const knex = require('../connection');

function getAllOptions() {
    return knex('search_options')
        .select('*');
}

function getSingleOption(id) {
    return knex('search_options')
        .select('*')
        .where({ cat_id: id });
}


async function addOption(option) {
    console.log(option);
    try {
        const result = await knex('search_options')
            .insert(option)
            .returning('*');

        return { result }
    } catch (err) {
        console.log(err.message);
        return { err: err.message }
    }
}

function updateOption(id, option) {
    return knex('search_options')
        .update(option)
        .where({ cat_id: id })
        .returning('*');
}
function deleteOption(id) {
    return knex('search_options')
        .del()
        .where({ option_id: id })
        .returning('*');
}

module.exports = {
    getAllOptions,
    getSingleOption,
    addOption,
    updateOption,
    deleteOption
};