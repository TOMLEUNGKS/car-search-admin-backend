
exports.up = function (knex, Promise) {

    return knex.raw(
        `
        CREATE TYPE engine_location_type AS ENUM ('Front', 'Back');
        CREATE TYPE drivetrain_type AS ENUM ('Rear Wheel Drive', 'Front Wheel Drive', 'All Wheel Drive');
        CREATE TYPE transmission_type AS ENUM ('Automatic', 'Manual');
        CREATE TYPE fuel_type AS ENUM ('Diesel', 'Petrol', 'Electric', 'Gas', 'Hybrid', 'Plug in Hybrid');
        alter table car_specs
            alter column "0-100 km/h" type Numeric(3,1),
            add "Fuel type" fuel_type,
            add "Length" Numeric(5,3),
            add "Width" Numeric(5,3),
            add "Height" Numeric(5,3),
            add "Wheelbase" Numeric(5,3),
            add "Curb Weight" Numeric(5,3),
            add "Turning Circle" Numeric(5,3),
            add "Boot Capacity" integer,
	        add "Engine Location" engine_location_type default 'Front',
            add "Drivetrain" drivetrain_type ,
            add "Transmission" transmission_type,
            add "Country made" varchar(10)
        `)

};

exports.down = function (knex, Promise) {

};
