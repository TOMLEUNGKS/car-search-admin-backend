const path = require('path')

exports.seed = async function (knex, Promise) {


  const seed_file = path.basename(__filename)
  const seedIsExist = await knex('knex_seeds_lock').where({ seed_file }).first()
  if (seedIsExist) {
    return
  } else {
    // Deletes ALL existing entries reset pk to 1 
    await knex('car_specs').truncate()

    await knex('knex_seeds_lock').insert({ seed_file })
    // Inserts seed entries
    await knex('car_specs').insert([
      {
        modelID: 3,
        badge: 'sDrive16i',
        Doors: 5,
        Seats: 5,
        Drivetrain: "Rear Wheel Drive",
        Transmission: 'Automatic',
        "Safety Rating": 5,
        "Engine Code": "N20B16",
        'Engine Size': null,
        Cylinder: null,
        'Engine Location': "Front",
        'Air Induction': null,
        Horsepower: null,
        "Max Horsepower": null,
        Torque: null,
        "Max Torque": null,
        'Power to Weight Ratio': null,
        '0-100 km/h': null,
        '1/4 Mile': null,
        'Fuel type': null,
        "Combined Fuel Consumption": null,
        "Fuel Tank Capacity": null,
        "Approximated Range": null,
        'Electric Motor': 2,
        "Length": 4.454,
        "Width": 4.454,
        "Height": 4.454,
        "Wheelbase": 2.760,
        "Turning Circle": null,
        "Curb Weight": null,
        "Boot Capacity": null,
        "Country Made": null
      },
      {
        modelID: 3,
        badge: 'sDrive18i',
        Doors: 5,
        Seats: 5,
        Drivetrain: "Rear Wheel Drive",
        Transmission: 'Automatic',
        "Safety Rating": 5,
        "Engine Code": "N46B20",
        'Engine Size': 1995,
        Cylinder: 4,
        'Engine Location': "Front",
        'Air Induction': "Naturally Aspirated",
        Horsepower: 147,
        "Max Horsepower": 6400,
        Torque: 200,
        "Max Torque": 3600,
        'Power to Weight Ratio': 101,
        '0-100 km/h': 10.4,
        '1/4 Mile': null,
        'Fuel type': "Petrol",
        "RON Rating": 98,
        "Combined Fuel Consumption": 8.4,
        "Fuel Tank Capacity": 63,
        "Approximated Range": 750,
        'Electric Motor': 2,
        "Length": 4.454,
        "Width": 4.454,
        "Height": 4.454,
        "Wheelbase": 2.760,
        "Turning Circle": 1.455,
        "Curb Weight": null,
        "Boot Capacity": null,
        "Country Made": null
      }
    ]);
    return
  }
};
