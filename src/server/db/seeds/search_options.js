

const path = require('path')


exports.seed = async function (knex, Promise) {
  // Deletes ALL existing entries

  const seed_file = path.basename(__filename)
  const seedIsExist = await knex('knex_seeds_lock').where({ seed_file }).first()
  if (seedIsExist) {
    return
  } else {
    return knex('search_options').del()
      .then(function () {
        // Inserts seed entries
        return knex('search_options').insert([
          {
            "parent_cat_id": "003",
            "value": "Audi",
          },
          {
            "parent_cat_id": "003",
            "value": "BMW"
          },
          {
            "parent_cat_id": "003",
            "value": "Ford"
          },
          {
            "parent_cat_id": "003",
            "value": "Holden"
          },
          {
            "parent_cat_id": "003",
            "value": "Hyundai"
          },
          {
            "parent_cat_id": "003",
            "value": "Kia"
          },
          {
            "parent_cat_id": "003",
            "value": "Mazda"
          },
          {
            "parent_cat_id": "003",
            "value": "Mercedes-Benz"
          },
          {
            "parent_cat_id": "003",
            "value": "Mitsubishi"
          },
          {
            "parent_cat_id": "003",
            "value": "Nissan"
          },
          {
            "parent_cat_id": "003",
            "value": "Subaru"
          },
          {
            "parent_cat_id": "003",
            "value": "Toyota"
          },
          {
            "parent_cat_id": "003",
            "value": "Abarth"
          },
          {
            "parent_cat_id": "003",
            "value": "AC"
          },
          {
            "parent_cat_id": "003",
            "value": "Alfa Romeo"
          },
          {
            "parent_cat_id": "003",
            "value": "Alpina"
          },
          {
            "parent_cat_id": "003",
            "value": "Alpine-Renault"
          },
          {
            "parent_cat_id": "003",
            "value": "Alvis"
          },
        ]);
      });
  }
};
