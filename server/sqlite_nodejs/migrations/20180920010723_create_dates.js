
exports.up = function(knex, Promise) {
    return knex.schema.createTable('Dates', function(t) {
        t.string('Date').notNullable();
        t.string('User').notNullable();
    })
};

exports.down = function(knex, Promise) {
    return knex.schema.dropTableIfExists('Dates')
};
