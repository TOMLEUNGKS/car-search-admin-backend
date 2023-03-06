const path = require('path')


exports.seed = async function (knex, Promise) {


  const seed_file = path.basename(__filename)
  const seedIsExist = await knex('knex_seeds_lock').where({ seed_file }).first()
  if (seedIsExist) {
    return
  } else {
    // Deletes ALL existing entries reset pk to 1 
    await knex('car_posts').truncate()

    await await knex('knex_seeds_lock').insert({ seed_file })
    // Inserts seed entries
    await knex('car_posts').insert([
      {
        carID: 'c0',
        "Listing Price": 100000,
        "Imgs": ["car.jpg", "car2.jpg"],
        dealerID: "admin",
        "Factory options": "no",
        "Aftermarket options": "na",
        Location: "Hong Kong",
        Odometer: 12054,
        isRegister: true,
        "Expired Date": "10/02/2022",
        "VIN number": "1546465321",
        "Exterior Colour": "black",
        "Manufactor Listed Colour": null,
        "Interior Colour": "black",
        "Seller type": "private",
        Services: ["Testdrive available", "Price adjustable"],
        Comments: "sdsdsdsd",

      },
      {
        carID: 'c2',
        "Listing Price": 103400,
        "Imgs": ["2car.jpg", "2car2.jpg"],
        dealerID: "admin",
        "Factory options": "no",
        "Aftermarket options": "na",
        Location: "Hong Kong Island",
        Odometer: 120543,
        isRegister: true,
        "Expired Date": "10/04/2022",
        "VIN number": "1546465sd21",
        "Exterior Colour": "white",
        "Manufactor Listed Colour": null,
        "Interior Colour": "black",
        "Seller type": "private",
        Services: ["Testdrive available", "Price adjustable"],
        Comments: "sdsdsdsd",

      },
    ]);
    return
  }

};
