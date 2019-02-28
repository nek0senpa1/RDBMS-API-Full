
exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('cohorts').truncate()
    .then(function () {
      // Inserts seed entries
      return knex('cohorts').insert([
        {id: 1, name: 'Cohort Ross'},
        {id: 2, name: 'Cohort Phoebe'},
        {id: 3, name: 'Cohort Monica'}
      ]);
    });
};
