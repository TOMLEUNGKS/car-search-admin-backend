
exports.up = function (knex, Promise) {
    return knex.raw(
        `
        CREATE TABLE car_payments (
            session_id varchar(100) PRIMARY KEY,
            amount integer NOT NULL,
            status VARCHAR ( 10 ) NOT NULL,
            updated_on TIMESTAMP NOT NULL  DEFAULT now(),
            created_on TIMESTAMP NOT NULL  DEFAULT now()
            );

        CREATE OR REPLACE FUNCTION trigger_set_timestamp()
            RETURNS TRIGGER AS $$
            BEGIN
              NEW.updated_on = NOW();
              RETURN NEW;
            END;
            $$ LANGUAGE plpgsql;

            CREATE TRIGGER set_update_timestamp
            BEFORE UPDATE ON car_payments
            FOR EACH ROW
            EXECUTE PROCEDURE trigger_set_timestamp();


        
        `
    )
};

exports.down = function (knex, Promise) {

};
