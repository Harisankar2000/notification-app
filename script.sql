-- Create the database
CREATE DATABASE notifications_db;

-- Create the Users table
CREATE TABLE Users (
    id SERIAL PRIMARY KEY,
    username VARCHAR(50) UNIQUE NOT NULL,
    password VARCHAR(255) NOT NULL
);

-- Create the Notifications table
CREATE TABLE Notifications (
    id SERIAL PRIMARY KEY,
    senderId INTEGER REFERENCES Users(id) ON DELETE CASCADE,
    receiverId INTEGER REFERENCES Users(id) ON DELETE CASCADE,
    message VARCHAR(255) NOT NULL,
    isRead BOOLEAN DEFAULT FALSE,
    createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
