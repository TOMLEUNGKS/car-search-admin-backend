
exports.up = function (knex, Promise) {
    return knex.schema.table('car_brands', (table) => {
        table.dropColumn('img_path');
        table.specificType('imgs', 'text ARRAY');
    });
};

exports.down = function (knex, Promise) {

};
