'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class time_capsule_messages extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      time_capsule_messages.belongsTo(models.users, {
        foreignKey: 'users_id',
        as: 'users',
      });
    }
  };
  time_capsule_messages.init({
    subject: DataTypes.STRING,
    message: DataTypes.STRING,
    release_time: DataTypes.DATE,
    active: DataTypes.BOOLEAN,
    attachment: DataTypes.STRING,
    users_id: DataTypes.UUID
  }, {
    sequelize,
    modelName: 'time_capsule_messages',
  });
  return time_capsule_messages;
};