const express = require('express');
const cerModel = require('./car-model')
const db = require('../data/db-config')

const router = express.Router();

router.get('/', async (req, res, next) => {
    db('cars')
    .then(cars => {
      res.json(cars);
    })
    .catch (err => {
      res.status(500).json({ message: 'Failed to get cars' });
    });
  });
  
  router.get('/:id', (req, res) => {
    const { id } = req.params;
  
    db('cars').where({ id })
    .then(cars => {
      const car = cars[0];
  
      if (car) {
        res.json(car);
      } else {
        res.status(404).json({ message: 'Could not find car with given id.' })
      }
    })
    .catch(err => {
      res.status(500).json({ message: 'Failed to get car' });
    });
  });
  
  router.post('/', (req, res) => {
    const carData = req.body;
  
    db('cars').insert(carData)
    .then(ids => {
      res.status(201).json({ created: ids[0] });
    })
    .catch(err => {
      res.status(500).json({ message: 'Failed to create new car' });
    });
  });
  
  router.put('/:id', (req, res) => {
    const { id } = req.params;
    const changes = req.body;
  
    db('cars').where({ id }).update(changes)
    .then(count => {
      if (count) {
        res.json({ update: count });
      } else {
        res.status(404).json({ message: 'Could not find car with given id' });
      }
    })
    .catch(err => {
      res.status(500).json({ message: 'Failed to update car' });
    });
  });
  
  router.delete('/:id', (req, res) => {
    const { id } = req.params;
  
    db('cars').where({ id }).del()
    .then(count => {
      if (count) {
        res.json({ removed: count });
      } else {
        res.status(404).json({ message: 'Could not find car with given id' });
      }
    })
    .catch(err => {
      res.status(500).json({ message: 'Failed to delete car' });
    });
  });
  
  module.exports = router;