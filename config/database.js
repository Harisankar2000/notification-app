const { Sequelize } = require('sequelize');
require('dotenv').config();

let sequelize = new Sequelize(
  process.env.DB_NAME,
  process.env.DB_USER,
  process.env.DB_PASS,
  {
    host: process.env.DB_HOST,
    dialect: 'postgres',
    logging: false,
    pool: {
      max: 5,
      min: 0, 
      acquire: 30000,
      idle: 10000,
    },
  }
);

// Test the database connection
sequelize
  .authenticate()
  .then(() => {
    console.log('Database connected successfully.');
  })
  .catch((err) => {
    console.error('Unable to connect to the database:', err);
  });

module.exports = sequelize;