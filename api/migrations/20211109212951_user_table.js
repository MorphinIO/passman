
exports.up = function(knex) {
    return knex.schema.createTable('users', t => {
        t.increments('id').unsigned().primary();
        t.string('email').unique().notNullable();
        t.string('password').defaultTo('');
        t.timestamp('created_at').defaultTo(knex.fn.now())
        t.timestamp('updated_at').defaultTo(knex.fn.now())
    });
};

exports.down = function(knex) {
    return knex.schema.dropTable('users');
};
