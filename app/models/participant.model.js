module.exports = (sequelize, Sequelize) => {
  const Participant = sequelize.define('participant', {
    // id: {
    //   type: Sequelize.INTEGER,
    //   allowNull: false,
    //   primaryKey: true,
    //   autoIncrement: true
    // },
    name: {
      type: Sequelize.STRING
    },
    email: {
      type: Sequelize.STRING,
      validate: {
        isEmail: true
      }
    },
    cpf: {
      type: Sequelize.STRING
    },
    comorbidity: {
      type: Sequelize.STRING
    },
    address: {
      type: Sequelize.STRING
    },
    district: {
      type: Sequelize.STRING
    },
    state: {
      type: Sequelize.STRING
    },
    city: {
      type: Sequelize.STRING
    }
  });

  return Participant;
};
