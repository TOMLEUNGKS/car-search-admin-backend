
exports.up = function (knex, Promise) {
    return knex.raw(
        `
        ALTER TABLE car_models
        ALTER COLUMN "yearStart" DROP NOT NULL,
        ALTER COLUMN "yearEnd" DROP NOT NULL;
        
        alter table car_models drop constraint car_models_pkey;
        
        alter table car_models 
        add primary key(brand,model,series,"Body type")
                
        `)


};

exports.down = function (knex, Promise) {

};
