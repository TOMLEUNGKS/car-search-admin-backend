
exports.up = function (knex, Promise) {
    return knex.raw(
        `
        ALTER TABLE car_specs 
        ALTER COLUMN "Power to Weight Ratio" TYPE numeric(4,1)
                
        `)
};

exports.down = function (knex, Promise) {

};
