
exports.up = function (knex, Promise) {
    return knex.schema.createTable('knex_seeds_lock', (table) => {

        table.string('seed_file').notNullable();

    });

};

exports.down = function (knex, Promise) {
    return knex.schema.dropTable('knex_seeds_lock');
};
