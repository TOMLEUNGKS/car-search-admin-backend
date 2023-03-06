
exports.up = function (knex, Promise) {
    return knex.raw(
        `
        ALTER TABLE car_posts ADD COLUMN created_at TIMESTAMP;
ALTER TABLE car_posts ALTER COLUMN created_at SET DEFAULT now();
                
ALTER TABLE car_posts ADD COLUMN is_paid boolean;
ALTER TABLE car_posts ALTER COLUMN is_paid SET DEFAULT false;

ALTER TABLE car_posts ADD COLUMN payment_session_id varchar(100);

        `)

};

exports.down = function (knex, Promise) {

};
