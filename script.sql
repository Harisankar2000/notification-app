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
    senderId INTEGER NOT NULL,
    receiverId INTEGER NOT NULL,
    message VARCHAR(255) NOT NULL,
    isRead BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (senderId) REFERENCES users(user_id) ON DELETE CASCADE,
    FOREIGN KEY (receiverId) REFERENCES users(user_id) ON DELETE CASCADE
);
