
const path = require('path')


exports.seed = async function (knex, Promise) {

  const seed_file = path.basename(__filename)
  const seedIsExist = await knex('knex_seeds_lock').where({ seed_file }).first()
  if (seedIsExist) {
    return
  } else {
    // Deletes ALL existing entries reset pk to 1 
    await knex('car_models').truncate()

    await await knex('knex_seeds_lock').insert({ seed_file })
    // Inserts seed entries
    await knex('car_models').insert([
      {
        brand: "BMW",
        model: '3 Series',

        series: "E21",
        'Body type': "Coupe",
        yearStart: "1975",
        yearEnd: "1982"

      },
      {
        brand: "BMW",
        model: '3 Series',

        series: "E21",
        'Body type': "Cabriolet",
        yearStart: "1978",
        yearEnd: "1981"

      }, {
        brand: "BMW",
        model: 'X1',

        series: "E84",
        'Body type': "SUV",
        yearStart: "2009",
        yearEnd: "2015"

      },
      {
        brand: "BMW",
        model: 'X1',

        series: "F48",
        'Body type': "SUV",
        yearStart: "2015",
        yearEnd: "2022"

      },
    ]);
    return
  }

};
