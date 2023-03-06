
exports.up = function (knex, Promise) {
    return knex.raw(
        `
            alter table car_specs
                rename column "Name" to badge
                
        `)
};

exports.down = function (knex, Promise) {

};
