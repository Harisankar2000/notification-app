const request = require('supertest');
const app = require('../app');
const { sequelize } = require('../models');

beforeAll(async () => {
  await sequelize.sync({ force: true });
});

afterAll(async () => {
  await sequelize.close();
});

describe('User Endpoints', () => {
  it('should register a new user', async () => {
    const res = await request(app)
      .post('/users/register')
      .send({ username: 'testuser', password: 'password123' });
    expect(res.statusCode).toEqual(201);
    expect(res.body.message).toBe('User registered successfully');
  });

  it('should login user and return a token', async () => {
    const res = await request(app)
      .post('/users/login')
      .send({ username: 'testuser', password: 'password123' });
    expect(res.statusCode).toEqual(200);
    expect(res.body.token).toBeDefined();
  });
});
