const express = require('express');
const router = express.Router();
const notificationController = require('../controllers/notificationController');
const auth = require('../middlewares/auth'); // JWT authentication middleware

// Send a notification (authenticated)
router.post('/send', auth, notificationController.sendNotification);

// Get all notifications with pagination (authenticated)
router.get('/', auth, notificationController.getNotifications);

// Mark a specific notification as read (authenticated)
router.put('/:id/read', auth, notificationController.markAsRead);

// Mark all notifications as read (authenticated)
 router.put('/markAllRead', auth, notificationController.markAllAsRead);

module.exports = router;
