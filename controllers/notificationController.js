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

    console.log("User ID:", userId); 
    const { page = 1, limit = 10 } = req.query; // Default to page 1, 10 items per page

    const offset = (page - 1) * limit;

    const notifications = await Notification.findAndCountAll({
      where: { receiverId: userId },
      limit: parseInt(limit, 10),
      offset: parseInt(offset, 10),
      order: [['createdAt', 'DESC']]
    });

    console.log("Count of notifications:", notifications.count); 
    console.log("Notifications retrieved:", notifications.rows); 

    res.json({
      totalItems: notifications.count,
      totalPages: Math.ceil(notifications.count / limit),
      currentPage: page,
      notifications: notifications.rows
    });
  } catch (error) {
    console.error("Error retrieving notifications:", error);
    res.status(500).json({ error: 'Failed to retrieve notifications' });
  }
};


exports.markAsRead = async (req, res) => {
  try {
    const { id } = req.params; // Notification ID from the request parameters
    console.log("inside mark as read")
    console.log("Notification ID:", id);
    console.log("Receiver ID:", req.userId);

    const result = await Notification.update(
      { isRead: true },
      { where: { notificationId: id, receiverId: req.userId } } // Ensure to match notificationId and receiverId
    );

    if (result[0] === 0) {
      return res.status(404).json({ error: 'Notification not found or already marked as read' });
    }

    res.json({ message: 'Notification marked as read' });
  } catch (error) {
    console.error("Error marking notification as read:", error);
    res.status(400).json({ error: 'Failed to mark notification as read' });
  }
};

exports.markAllAsRead = async (req, res) => {
  try {
    const userId = req.userId;

    // Update notifications and get the result
    const [updatedCount] = await Notification.update(
      { isRead: true },
      { where: { receiverId: userId, isRead: false } }
    );

    // Check if any notifications were updated
    if (updatedCount === 0) {
      return res.status(404).json({ message: 'No unread notifications found' });
    }

    res.json({ message: 'All notifications marked as read', count: updatedCount });
  } catch (error) {
    console.error("Error marking all notifications as read:", error);
    res.status(500).json({ error: 'Failed to mark all notifications as read' });
  }
};
