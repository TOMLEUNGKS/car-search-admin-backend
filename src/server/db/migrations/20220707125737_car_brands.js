
exports.up = function (knex, Promise) {
    return knex.schema.createTable('car_brands', (table) => {
        table.increments();
        table.string('brand_name').notNullable().unique();
        table.string('img_path').notNullable();
    });
};

exports.down = function (knex, Promise) {
    return knex.schema.dropTable('car_brands');
};
