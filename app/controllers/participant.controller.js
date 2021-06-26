const db = require('../models');
const Participant = db.participants;
const Op = db.Sequelize.Op;

// Create and Save a new Participant
exports.create = (req, res) => {
  // Validate request
  if (!req.body.name) {
    res.status(400).send({
      message: 'Content can not be empty!'
    });
    return;
  }

  // Create a Participant
  const participant = {
    name: req.body.name,
    email: req.body.email,
    cpf: req.body.cpf,
    birthdate: req.body.birthdate,
    comorbidity: req.body.comorbidity,
    address: req.body.address,
    district: req.body.district,
    state: req.body.state,
    city: req.body.city
  };

  // Save Participant in the database
  Participant.create(participant)
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message:
          err.message || 'Some error occurred while creating the Participant.'
      });
    });
};

// Retrieve all Participants from the database.
exports.findAll = (req, res) => {
  const name = req.query.name;
  var condition = name ? { name: { [Op.iLike]: `%${name}%` } } : null;

  Participant.findAll({ where: condition })
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message:
          err.message || 'Some error occurred while retrieving participants.'
      });
    });
};

// Find a single Participant with an id
exports.findOne = (req, res) => {
  const id = req.params.id;

  Participant.findByPk(id)
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message: 'Error retrieving Participant with id=' + id
      });
    });
};

// Update a Participant by the id in the request
exports.update = (req, res) => {
  const id = req.params.id;

  Participant.update(req.body, {
    where: { id: id }
  })
    .then((num) => {
      if (num == 1) {
        res.send({
          message: 'Participant was updated successfully.'
        });
      } else {
        res.send({
          message: `Cannot update Participant with id=${id}. Maybe Participant was not found or req.body is empty!`
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: 'Error updating Participant with id=' + id
      });
    });
};

// Delete a Participant with the specified id in the request
exports.delete = (req, res) => {
  const id = req.params.id;

  Participant.destroy({
    where: { id: id }
  })
    .then((num) => {
      if (num == 1) {
        res.send({
          message: 'Participant was deleted successfully!'
        });
      } else {
        res.send({
          message: `Cannot delete Participant with id=${id}. Maybe Participant was not found!`
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: 'Could not delete Participant with id=' + id
      });
    });
};

// Delete all Participants from the database.
exports.deleteAll = (req, res) => {
  Participant.destroy({
    where: {},
    truncate: false
  })
    .then((nums) => {
      res.send({ message: `${nums} Participants were deleted successfully!` });
    })
    .catch((err) => {
      res.status(500).send({
        message:
          err.message || 'Some error occurred while removing all Participants.'
      });
    });
};

// Find all published Participants
exports.findAllPublished = (req, res) => {
  Participant.findAll({ where: { published: true } })
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message:
          err.message || 'Some error occurred while retrieving participants.'
      });
    });
};
