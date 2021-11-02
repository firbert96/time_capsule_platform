'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.createTable('time_capsule_messages', {
      id: {
          type: Sequelize.BIGINT,
          field: id,
          autoIncrement: true,
          primaryKey: true,
          allowNull: false
      },
      users_id: {
          type: Sequelize.BIGINT,
          field: users_id,
          allowNull: false,
          references:{ model: {tableName: 'users'}, key: 'id' }
      },
      uuid: {
        type: Sequelize.UUID,
        defaultValue: Sequelize.UUIDV4,
      },
      subject: {
          type: Sequelize.STRING(60),
          field: subject,
          allowNull: false
      },
      message: {
          type: Sequelize.STRING,
          field: message,
          allowNull: false
      },
      release_time: {
          type: Sequelize.DATE,
          field: release_time,
          allowNull: false
      },
      active : {
          type: Sequelize.BOOLEAN,
          field: active,
          allowNull: false
      },
      });
  },

  down: async (queryInterface, Sequelize) => {
    return queryInterface.dropTable('time_capsule_messages');
  }
};
