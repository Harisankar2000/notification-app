const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');
const User = require('./User');

const Notification = sequelize.define('Notification', {
  senderId: { type: DataTypes.INTEGER, allowNull: false },
  receiverId: { type: DataTypes.INTEGER, allowNull: false },
  message: { type: DataTypes.STRING(255), allowNull: false },
  isRead: { type: DataTypes.BOOLEAN, defaultValue: false }
});

Notification.belongsTo(User, { as: 'Sender', foreignKey: 'senderId' });
Notification.belongsTo(User, { as: 'Receiver', foreignKey: 'receiverId' });

module.exports = Notification;
