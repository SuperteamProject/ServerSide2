/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function(knex) {
    return knex.raw('DROP TABLE IF EXISTS product CASCADE;');
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function(knex) {
    return knex.schema.createTable('product', function (table) {
        table.increments('id').primary();
        table.string('image',255).notNullable();
        table.string('name', 100).notNullable();
        table.string('price', 100).notNullable();
        table.timestamps(true, true); // -> akan mengenerate created_at sama updated_at
    })
};
