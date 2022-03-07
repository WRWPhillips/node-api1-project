// BUILD YOUR SERVER HERE
const express = require('express');
const server = express();
const Users = require('./users/model.js')

server.use(express.json());


server.get('/api/users', (req, res) => {
  Users.find()
    .then((users) => {
      res.json(users);
    });
})

server.post('/api/users', (req, res) => {
  const body = req.body

  !body.name | !body.bio ? res.status(400).json({ message: "provide name and bio"}) : 

  Users.insert(body)
    .then((newUser) => {
      res.status(201).json(newUser);
    })
    .catch(err => {
      res.status(500)
    });
});

server.get('/api/users/:id', (req, res) => {
  Users.findById(req.params.id)
    .then(user => {
      if(user == null) {
        res.status(404).json({ message: 'does not exist' });
      } else {
        res.status(200).json(user);
      }
    })
    .catch(err => {
      res.status(500)
    });
});

server.delete('/api/users/:id', (req, res) => {
  Users.remove(req.params.id)
    .then(user => {
      !user ? res.status(404).json({message: 'does not exist'}) : 
      res.status(200).json(user);
    })
    .catch(err => {
      res.status(500).json(err.message);
    });
});

server.put('/api/users/:id', (req, res) => {
  !req.body.name | !req.body.bio ? res.status(400).json({message: 'provide name and bio' }) :
  Users.update(req.params.id, req.body)
    .then(user => {
      !user ? res.status(404).json({message: "does not exist"}):
      res.status(400).json(user);
    })
    .catch(err => {
      res.status(500).json({message: err.msg});
    });  
});


module.exports = server; // EXPORT YOUR SERVER instead of {}
