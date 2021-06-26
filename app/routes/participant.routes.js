module.exports = (app) => {
  const participants = require('../controllers/participant.controller.js');

  var router = require('express').Router();

  // Create a new Participant
  router.post('/', participants.create);

  // Retrieve all participants
  router.get('/', participants.findAll);

  // Retrieve all published participants
  router.get('/published', participants.findAllPublished);

  // Retrieve a single Participant with id
  router.get('/:id', participants.findOne);

  // Update a Participant with id
  router.put('/:id', participants.update);

  // Delete a Participant with id
  router.delete('/:id', participants.delete);

  // Create a new Participant
  router.delete('/', participants.deleteAll);

  app.use('/api/participants', router);
};
