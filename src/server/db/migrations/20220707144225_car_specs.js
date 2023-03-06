
exports.up = function (knex, Promise) {
    return knex.schema.createTable('car_specs', (table) => {
        table.increments("carID");
        table.string('Name').notNullable().unique();
        table.string('Brand').notNullable();
        table.string('Model').notNullable();
        table.string('Body type').notNullable();
        table.string('Built year').notNullable();
        table.string('Colour').notNullable();
        table.integer('Seats').notNullable();
        table.integer('Doors').notNullable();
        table.string('Fuel type').notNullable();
        table.integer('Engine Size').notNullable();
        table.integer('Cylinder').notNullable();
        table.string('Air Induction').notNullable();
        table.string('Transmission').notNullable();
        table.integer('Horsepower').notNullable();
        table.integer('Torque').notNullable();
        table.integer('Power to Weight Ratio').notNullable();
        table.integer('Electric Motor').notNullable();
        table.integer('0-100 km/h').notNullable();
    });
};

exports.down = function (knex, Promise) {
    return knex.schema.dropTable('car_specs');
};
