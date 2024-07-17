/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function(knex) {
    return knex.schema.createTable('febri', function (table) {
        table.increments('id').primary();
        table.string('username',255).notNullable();
        table.string('email', 100).notNullable();
        table.string('password', 100).notNullable();
        table.timestamps(true, true); // -> akan mengenerate created_at sama updated_at
    })
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function(knex) {
  
};
