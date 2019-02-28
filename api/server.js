const express = require('express');
const helmet = require('helmet');


const softserver = express();

softserver.use(helmet());
softserver.use(express.json());


// const knex = require('knex');

// const knexConfig = {
//   client: 'sqlite3',
//   useNullAsDefault: true,
//   connection: {
//     filename: './data/rolex.db3'
//   }
// }

//const knexConfig = require('../knexfile.js')

// const db = knex(knexConfig);

softserver.get('/', (req, res) => {
  db('roles')
  .then( roles => {
    res.status(200).json(roles)
  })
  .catch(err => {
    res.status(500).json(err)
  })
});

softserver.get('/:id', (req, res) => {
  db('roles')
  .where({id: req.params.id})
  .then(role => {
    res.status(200).json({role})
  })
  .catch(err => {
    res.status(500).json(err)
  })
  
});



softserver.post('/', (req, res) => {
  
  db('roles')
  .insert(req.body)
  .then(ids => {
    //const[id] = ids;
    //db('roles').where({id}).first().then( role => {
      res.status(200).json(ids);
    //})
  })
  .catch(err => {
    res.status(500).json(err)
  })
});



softserver.put('/:id', (req, res) => {
  db('roles')
  .where({id: req.params.id})
  .update(req.body)
  .then( count => {
    if (count > 0) {
      db('roles').where({id: req.params.id})
      .then( role => {
        res.status(200).json(role)
      })
    } else { res.status(404).json({message: 'failure'})}
  })
  .catch(err => {
    res.status(500).json(err)
  })
});



softserver.delete('/:id', (req, res) => {
  const id = req.params.id;
  
  db('roles').where({id}).del()
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
