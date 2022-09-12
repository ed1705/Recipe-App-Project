/**
 * @param { import("knex").Knex } knex
 * @returns {Knex.SchemaBuilder}
 */
exports.up = function(knex) {
  return knex.schema.createTable('ingredients', (table) => {
      table.string('id').primary()
      table.string('recipe_id').notNullable()
      table.string('name')
      table.string('amount')
  })
};

/**
 * @param { import("knex").Knex } knex
 * @returns {Knex.SchemaBuilder}
 */
exports.down = function(knex) {
  return knex.schema.dropTable('ingredients');
};
