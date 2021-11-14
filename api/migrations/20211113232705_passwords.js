
exports.up = function(knex) {
    return knex.schema.createTable('passwords', t => {
        t.increments('id').unsigned().primary();
        t.string('username').references('email').inTable('users').onDelete('CASCADE').index()
        t.string('title').notNullable();
        t.string('email').notNullable();
        t.string('password').notNullable();
        t.timestamp('created_at').defaultTo(knex.fn.now())
        t.timestamp('updated_at').defaultTo(knex.fn.now())
    });
};

exports.down = function(knex) {
    return knex.schema.dropTable('passwords');
};
