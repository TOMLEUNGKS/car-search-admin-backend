
const path = require('path')
exports.seed = async function (knex, Promise) {

  const seed_file = path.basename(__filename)
  const seedIsExist = await knex('knex_seeds_lock').where({ seed_file }).first()
  if (seedIsExist) {
    return
  } else {
    // Deletes ALL existing entries reset pk to 1 
    await knex('car_brands').truncate()

    await knex('knex_seeds_lock').insert({ seed_file })
    // Inserts seed entries
    await knex('car_brands').insert([
      { id: 1, brand_name: 'Audi', img_path: "Audi.png" },
      { id: 2, brand_name: 'asdas', img_path: "asdas.png" },
    ]);
    return
  }
};
