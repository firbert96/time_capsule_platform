'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.createTable('users', {
      id: {
        type: Sequelize.BIGINT,
        field: id,
        autoIncrement: true,
        primaryKey: true,
        allowNull: false
      },
      uuid: {
        type: Sequelize.UUID,
        defaultValue: Sequelize.UUIDV4,
      },
      fullname: {
          type: Sequelize.STRING(50),
          field: fullname,
          allowNull: false
      },
      email: {
          type: Sequelize.STRING(25),
          field: email,
          unique: true,
          allowNull: false
      },
      password: {
          type: Sequelize.STRING,
          field: password,
          allowNull: false
      }
    });
  },

  down: async (queryInterface, Sequelize) => {
    return queryInterface.dropTable('users');
  }
};
