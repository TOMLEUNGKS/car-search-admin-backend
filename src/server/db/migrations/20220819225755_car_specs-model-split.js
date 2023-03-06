
exports.up = function (knex, Promise) {

    return knex.schema.table('car_specs', (table) => {

        table.dropColumn('Brand');
        table.dropColumn('Body type');
        table.dropColumn('Model');
        table.dropColumn('Colour');
        table.dropColumn('Transmission');
        table.dropColumn('Fuel type');
        table.integer('modelID').notNullable()
        table.string('Safety Rating')
        table.string('Engine Code')
        table.string('Induction')
        table.integer('Max Horsepower');
        table.integer('Max Torque');
        table.integer('1/4 Mile');
        table.integer('RON Rating');
        table.decimal('Combined Fuel Consumption', 4, 2);
        table.integer('Fuel Tank Capacity');
        table.integer('Approximated Range');

    });


};

exports.down = function (knex, Promise) {

};
