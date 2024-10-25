# Notification App

This Node.js application provides user registration, login, and real-time notifications using Socket.IO. Notifications are stored in PostgreSQL and can be retrieved later if the user is offline. The app supports pagination for notifications and provides unit tests and Docker support for deployment.

## Table of Contents
1. [Features](#features)
2. [Technologies Used](#technologies-used)
3. [Installation](#installation)
4. [API Documentation](#api-documentation)

## Features

- User registration and login with JWT authentication
- Real-time notifications using Socket.IO
- Notifications stored in PostgreSQL for offline retrieval
- Pagination for fetching notifications
- Mark all notifications as read at once
- Unit tests with Jest and Supertest

## Technologies Used

- Node.js
- Express.js
- Sequelize ORM
- PostgreSQL
- Socket.IO
- JWT for authentication
- bcrypt for password hashing
- Jest and Supertest for unit testing

## Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/Harisankar2000/notification-app.git
   cd notification-app
2. To install the necessary dependencies, run:
   ```bash
   npm install
3. To start the application, run:
   ```bash
   npm start


## API-documentation

## User Registration
- **Endpoint:** `POST /users/register`
- **Request Body:**
  ```json
  {
    "username": "user123",
    "password": "password123"
  }

## User Login
- **Endpoint:** `POST /users/login`
- **Request Body:**
  ```json
  {
    "username": "user123",
    "password": "password123"
  }

## Send Notification
- **Endpoint:** `POST /notifications/send`
- **Headers:** `Authorization: Bearer jwt_token`
- **Request Body:**
  ```json
  {
  "senderId": 1,
  "receiverId": 2,
  "message": "Hello from user123"
  }

## Get Notifications
- **Endpoint:** `GET /notifications`
- **Headers:** `Authorization: Bearer jwt_token`
- **Query Parameters:**
   - page: Page number (default: 1)
   - limit: Items per page (default: 10)


## Mark Notification as Read
- **Endpoint:** `PUT /notifications/markRead/:id`
- **Headers:** `Authorization: Bearer jwt_token`

## Mark All Notification as Read
- **Endpoint:** `PUT /notifications/markAllRead`
- **Headers:** `Authorization: Bearer jwt_token`
- **Request Body:**
 ```json
  {
  "userId": 1,
  }



