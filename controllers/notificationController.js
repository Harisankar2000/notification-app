const Notification = require('../models/Notification');
const User = require('../models/User');

exports.sendNotification = async (req, res) => {
  try {
    const { senderId, receiverId, message } = req.body;
    const notification = await Notification.create({ senderId, receiverId, message });
    // Emit real-time notification here if receiver is online
    res.status(201).json(notification);
  } catch (error) {
    res.status(400).json({ error: 'Failed to send notification' });
  }
};

exports.getNotifications = async (req, res) => {
  try {
    const userId = req.userId; // Set in auth middleware
    const notifications = await Notification.findAll({
      where: { receiverId: userId },
      order: [['createdAt', 'DESC']]
    });
    res.json(notifications);
  } catch (error) {
    res.status(500).json({ error: 'Failed to retrieve notifications' });
  }
};

exports.markAsRead = async (req, res) => {
  try {
    const { id } = req.params;
    await Notification.update({ isRead: true }, { where: { id, receiverId: req.userId } });
    res.json({ message: 'Notification marked as read' });
  } catch (error) {
    res.status(400).json({ error: 'Failed to mark notification as read' });
  }
};
