/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function(knex) {
    return knex.schema.createTable('cart', function (table) {
        table.increments('id').primary();
        table.integer('user_id').unsigned().notNullable().references('id').inTable('user_account').onDelete('CASCADE').onUpdate('CASCADE');	
        table.integer('product_id').unsigned().notNullable().references('id').inTable('product').onDelete('CASCADE').onUpdate('CASCADE')
        table.integer('quantity').notNullable();
        table.timestamps(true, true); // -> akan mengenerate created_at sama updated_at
    })								
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function(knex) {
  return knex.schema.dropTable('cart');
};
