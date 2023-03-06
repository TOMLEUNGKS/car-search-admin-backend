
exports.up = function (knex, Promise) {
    return knex.schema.table('car_specs', (table) => {

        table.dropColumn('Induction');
    })
};

exports.down = function (knex, Promise) {

};
