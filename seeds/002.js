
exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('students').del()
    .then(function () {
      // Inserts seed entries
      return knex('students').insert([
        {id: 1, name: 'Joey', cohort_id: 1},
        {id: 2, name: 'Chandler', cohort_id: 1},
        {id: 3, name: 'Rachel', cohort_id: 2},
        {id: 4, name: 'Tom', cohort_id: 2}
      ]);
    });
};
