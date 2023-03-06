
exports.up = function (knex, Promise) {

    return knex.schema.createTable('post_contacts', (table) => {
        table.increments("contactID");
        table.string('postID').notNullable();
        table.string('lastname').notNullable();
        table.string('surename').notNullable();
        table.string('email').notNullable();
        table.string('phoneNumber').notNullable();
        table.string('secPhoneNUmber');

    });


};

exports.down = function (knex, Promise) {
    return knex.schema.dropTable('post_contacts');
};
