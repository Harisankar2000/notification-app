const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');
const User = require('./User');

// Define the Notification model
const Notification = sequelize.define('Notification', {
    notification_id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    senderId: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    receiverId: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    message: {
        type: DataTypes.STRING(255),
        allowNull: false,
    },
    isRead: {
        type: DataTypes.BOOLEAN,
        defaultValue: false,
    },
    created_at: {
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW,
    }
}, {
    tableName: 'notifications',
    timestamps: false
});

// Define associations
Notification.belongsTo(User, { as: 'Sender', foreignKey: 'senderId' });
Notification.belongsTo(User, { as: 'Receiver', foreignKey: 'receiverId' });

// Export the Notification model
module.exports = Notification;
