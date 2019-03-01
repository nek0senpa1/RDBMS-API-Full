
const express = require('express');
const helmet = require('helmet');
const knex = require('knex');

const softserver = express();

softserver.use(helmet());
softserver.use(express.json());

// const knexConfig = {
//   client: 'sqlite3',
//   useNullAsDefault: true,
//   connection: {
//     filename: './data/rolex.db3'
//   }
// }

const knexConfig = require('../knexfile');



const db = knex(knexConfig.development);

softserver.get('/', (req, res) => {
    res.send ({message: 'Heyo it is working!'})
  });


softserver.get('/api/cohorts', (req, res) => {
  db('cohorts')
  .then( roles => {
    res.status(200).json(roles)
  })
  .catch(err => {
    res.status(500).json(err)
  })
});

softserver.get('/api/cohorts/:id', (req, res) => {
  db('cohorts')
  .where({id: req.params.id})
  .first()
  .then(cohort => {
    res.status(200).json({cohort})
  })
  .catch(err => {
    res.status(500).json(err)
  })
  
});

softserver.get('/api/cohorts/:id/students', (req, res) => {
    db('students')
    .where({cohort_id: req.params.id})
    .then ( studenties => {
        res.status(200).json(studenties);
    })
    
    
    .catch(err => {
        res.status(500).json(err).send({message: 'You goofed it up bad'})
    })
});



softserver.post('/api/cohorts', (req, res) => {
  
  db('cohorts')
  .insert(req.body)
  .then(ids => {
    //const[id] = ids;
    //db('roles').where({id}).first().then( role => {
      res.status(200).json(ids);
    //})
  })
  .catch(err => {
    res.status(500).json(err).send({message: 'probably a dupe name'})
  })
});



softserver.put('/api/cohorts/:id', (req, res) => {
  db('cohorts')
  .where({id: req.params.id})
  .update(req.body)
  .then( count => {
    if (count > 0) {
      db('cohorts').where({id: req.params.id})
      .then( role => {
        res.status(200).json(role)
      })
    } else { res.status(404).json({message: 'failure'})}
  })
  .catch(err => {
    res.status(500).json(err)
  })
});



softserver.delete('/api/cohorts/:id', (req, res) => {
  const id = req.params.id;
  
  db('cohorts').where({id}).del()
  .then(response => {
    if(response > 0) {
      res.status(204).json({message: 'Dude it is gone!'})
    } else { res.status(404).json({message: 'Nothing Here'})}
  })
  .catch(err => {
    res.status(500).json(err)
  })

});


module.exports = softserver;
