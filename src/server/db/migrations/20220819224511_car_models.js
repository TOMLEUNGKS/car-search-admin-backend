
exports.up = function (knex, Promise) {

    return knex.schema.createTable('car_models', (table) => {
        table.increments("modelID");
        table.string('brand').notNullable();
        table.string('model').notNullable();
        table.string('series').notNullable();
        table.string('Body type').notNullable();
        table.string('yearStart').notNullable();
        table.string('yearEnd').notNullable();
    });


};

exports.down = function (knex, Promise) {
    return knex.schema.dropTable('car_models');
};
