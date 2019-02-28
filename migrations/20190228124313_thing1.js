
exports.up = function(knex, Promise) {
  return knex.schema.createTable('cohorts', function(tabble) {
      tabble.increments();

      tabble.string('name').notNullable().unique();
  })
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTableIfExists('cohorts');
};
