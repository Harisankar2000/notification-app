const Notification = require('../models/Notification');
const User = require('../models/User');

exports.sendNotification = async (req, res) => {
  try {
    const { senderId, receiverId, message } = req.body;

    // Validate sender and receiver
    const sender = await User.findByPk(senderId);
    const receiver = await User.findByPk(receiverId);
    console.log("sender",sender)

    if (!sender || !receiver) {
      return res.status(404).json({ error: 'Sender or receiver not found' });
    }

    const notification = await Notification.create({ senderId, receiverId, message });
    res.status(201).json(notification);
  } catch (error) {
    console.error('Error sending notification:', error);
    res.status(400).json({ error: 'Failed to send notification' });
  }
};

exports.getNotifications = async (req, res) => {
  try {
    const userId = req.userId; // From JWT middleware
    const { page = 1, limit = 10 } = req.query; // Default to page 1, 10 items per page

    const offset = (page - 1) * limit;
    const { count, rows: notifications } = await Notification.findAndCountAll({
      where: { receiverId: userId },
      limit: parseInt(limit),
      offset: parseInt(offset),
      order: [['createdAt', 'DESC']]
    });

    res.json({
      totalItems: count,
      totalPages: Math.ceil(count / limit),
      currentPage: page,
      notifications
    });
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

exports.markAllAsRead = async (req, res) => {
  try {
    const userId = req.userId;
    await Notification.update(
      { isRead: true },
      { where: { receiverId: userId, isRead: false } }
    );
    res.json({ message: 'All notifications marked as read' });
  } catch (error) {
    res.status(500).json({ error: 'Failed to mark all notifications as read' });
  }
};