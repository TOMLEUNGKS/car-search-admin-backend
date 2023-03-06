const knex = require('../connection');

function getAllBrands() {
    return knex('car_brands')
        .select('*');
}

function getSingleBrand(id) {
    return knex('car_brands')
        .select('*')
        .where({ brand_id: parseInt(id) });
}


async function addBrand(brand) {
    console.log(brand);
    try {
        const result = await knex('car_brands')
            .insert(brand)
            .returning('*');

        return { result }
    } catch (err) {
        console.log(err.message);
        return { err: err.message }
    }
}

function updateBrand(id, brand) {
    return knex('car_brands')
        .update(brand)
        .where({ brand_id: parseInt(id) })
        .returning('*');
}
function deleteBrand(id) {
    return knex('car_brands')
        .del()
        .where({ brand_id: parseInt(id) })
        .returning('*');
}

module.exports = {
    getAllBrands,
    getSingleBrand,
    addBrand,
    updateBrand,
    deleteBrand
};