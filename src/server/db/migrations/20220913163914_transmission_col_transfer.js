
exports.up = function (knex, Promise) {
    return knex.raw(
        `
        ALTER TABLE car_posts ADD transmission transmission_type
        
        
        `




    )

};

exports.down = function (knex, Promise) {

};
