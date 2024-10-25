-- Create the database
CREATE DATABASE notifications_db;

-- Create the Users table
CREATE TABLE users (
    user_id SERIAL PRIMARY KEY,
    username VARCHAR(255) UNIQUE NOT NULL,
    password VARCHAR(255) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Create the Notifications table
CREATE TABLE notifications (
    notification_id SERIAL PRIMARY KEY,
    sender_id INTEGER NOT NULL, -- changed senderId to sender_id
    receiver_id INTEGER NOT NULL, -- changed receiverId to receiver_id
    message VARCHAR(255) NOT NULL,
    is_read BOOLEAN DEFAULT FALSE, -- changed isRead to is_read
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (sender_id) REFERENCES users(user_id) ON DELETE CASCADE,
    FOREIGN KEY (receiver_id) REFERENCES users(user_id) ON DELETE CASCADE
);
