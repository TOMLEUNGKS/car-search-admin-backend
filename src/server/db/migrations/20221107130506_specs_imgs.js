
exports.up = function (knex, Promise) {
    return knex.schema.table('car_specs', (table) => {
        table.specificType('imgs', 'text ARRAY');
    });
};

exports.down = function (knex, Promise) {

};
