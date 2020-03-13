const request = require('supertest');
const app = require('../app');
const { setupDatabase } = require('./fixtures/db');

beforeEach(setupDatabase);

test('Should sign up a new user', async () => {
  await request(app)
    .post('/users/signup')
    .set('Content-Type', 'application/json')
    .send({
      name: 'Thom',
      email: 'thom1@example.com',
      password: 'MyPassword777!'
    }).expect(201);
});