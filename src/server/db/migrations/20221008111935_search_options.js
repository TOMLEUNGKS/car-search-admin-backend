
exports.up = function (knex, Promise) {
    return knex.schema.createTable('search_options', (table) => {
        table.uuid("cat_id").defaultTo(knex.raw("public.uuid_generate_v4()"));
        table.string("parent_cat_id").notNullable();
        table.string("value").notNullable();
        table.primary(['parent_cat_id', 'value']);

    });
};

exports.down = function (knex, Promise) {
    return knex.schema.dropTable('search_options');
};
