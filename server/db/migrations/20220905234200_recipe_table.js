/**
 * @param { import("knex").Knex } knex
 * @returns {Knex.SchemaBuilder}
 */
exports.up = function(knex) {
  return knex.schema.createTable('recipes', (table) => {
        table.string('id').primary()
        table.string('name')
        table.integer('servings')
        table.string('cookTime')
        table.string('instructions')
  });
};

/**
 * @param { import("knex").Knex } knex
 * @returns {Knex.SchemaBuilder}
 */
exports.down = function(knex) {
  return knex.schema.dropTable('recipes')
};
