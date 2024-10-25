const express = require('express');
const router = express.Router();
const notificationController = require('../controllers/notificationController');
const auth = require('../middlewares/auth'); // JWT authentication middleware

// Send a notification
router.post('/send', auth, notificationController.sendNotification);

// Get all notifications with pagination
router.get('/', auth, notificationController.getNotifications);

// Mark a specific notification as read
router.put('/:id/read', auth, notificationController.markAsRead);

// Mark all notifications as read
 router.put('/markAllRead', auth, notificationController.markAllAsRead);

module.exports = router;
