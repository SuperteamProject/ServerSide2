/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function(knex) {
    return knex.schema.alterTable('product', function (table) {
        table.integer('price').alter(); // Change the type of 'price' to integer
    });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function(knex) {
    return knex.schema.alterTable('product', function (table) {
        table.string('price', 100).alter(); // Revert the type of 'price' to string
    });
};
