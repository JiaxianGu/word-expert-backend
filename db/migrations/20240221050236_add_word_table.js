/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function(knex) {
  return knex.schema.createTable('words', function(table) {
    table.increments("id").primary();
    table.string('word', 255);
    table.text('meaning');
    table.string('users').references("users.user_name");
  })
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function(knex) {
  knex.schema.dropTable('words');
};
