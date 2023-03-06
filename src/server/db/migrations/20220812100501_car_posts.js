
exports.up = function (knex, Promise) {

    return knex.schema.createTable('car_posts', (table) => {
        table.increments("postID");
        table.string('carID').notNullable();
        table.specificType('Imgs', 'text[]').notNullable();
        table.integer('Listing Price').notNullable();
        table.string('dealerID').notNullable();
        table.string('Factory options').notNullable();
        table.string('Aftermarket options').notNullable();
        table.string('Location').notNullable();
        table.integer('Odometer').notNullable();
        table.boolean('isRegister').notNullable().defaultTo(0);
        table.string('Expired Date').notNullable();
        table.string('VIN number').notNullable();
        table.string('Exterior Colour').notNullable();
        table.string('Manufactor Listed Colour');
        table.string('Interior Colour').notNullable();
        table.string('Comments').notNullable();
        table.string('Seller type').notNullable();
        table.specificType('Services', 'text[]').notNullable();
        table.timestamp('DatetimeCreate').notNullable().defaultTo(knex.fn.now());
    });

};

exports.down = function (knex, Promise) {
    return knex.schema.dropTable('car_posts');
};
