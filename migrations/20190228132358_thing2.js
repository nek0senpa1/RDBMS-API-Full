exports.up = function(knex, Promise) {
    return knex.schema.createTable('students', function(tabble) {
        tabble.increments();
  
        tabble.string('name').notNullable();

        tabble.integer('cohort_id').notNullable().unsigned()
        .references('id').inTable('cohorts')
        .onDelete('CASCADE').onUpdate('CASCADE');
    })
  };
  
  exports.down = function(knex, Promise) {
    return knex.schema.dropTableIfExists('students');
  };
  