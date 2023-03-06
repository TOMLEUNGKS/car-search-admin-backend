
exports.up = function (knex, Promise) {
        return knex.raw(
                `
        alter table car_posts 
        RENAME COLUMN "Odometer" TO Mileage;

        alter table car_posts 
        add built_year varchar(4),
add front_rim varchar(20),
add  rear_rim varchar(20),
add  front_tyre varchar(20),
add  rear_tyre varchar(20),
add  tyre_model varchar(20);

alter table car_posts 
rename column "Imgs" to imgs;
                
        `)
};

exports.down = function (knex, Promise) {

};
