const request = require('supertest');
const app = require('../app');
const { clearDatabase } = require('./fixtures/db');

beforeAll(clearDatabase);

const userTokens = [];

test('Should sign up a new user', async () => {
  const response = await request(app)
    .post('/users/signup')
    .set('Content-Type', 'application/json')
    .send({
      name: 'Thom',
      email: 'thom1@example.com',
      password: 'MyPassword777!'
    }).expect(201);

  userTokens.push(response.body.token);
});

test('Should log in existing user', async () => {
  const response = await request(app)
    .post('/users/login')
    .set('Content-Type', 'application/json')
    .send({
      email: 'thom1@example.com',
      password: 'MyPassword777!'
    }).expect(200)

  userTokens.push(response.body.token);
});

test('Should not log in nonexistent user', async () => {
  await request(app)
    .post('/users/login')
    .set('Content-Type', 'application/json')
    .send({
      email: 'notanexistinguser@example.com',
      password: 'Testpassword123@@**'
    }).expect(400)
})

test('Should update existing user', async () => {
  await request(app)
    .patch('/users/me')
    .set({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${userTokens[0]}`
    })
    .send({
      email: 'thom2@example.com',
      password: 'MyPassword666!'
    }).expect(200)
});

test('Should not update user without JWT', async () => {
  await request(app)
    .patch('/users/me')
    .set({
      'Content-Type': 'application/json'
    })
    .send({
      email: 'thom2@example.com',
      password: 'MyPassword666!'
    }).expect(401)
});

test('Should delete existing user', async () => {
  await request(app)
    .delete('/users/me')
    .set({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${userTokens[0]}`
    })
    .send()
    .expect(200)
});

test('Should not delete user without JWT', async () => {
  await request(app)
    .delete('/users/me')
    .set({
      'Content-Type': 'application/json'
    })
    .send()
    .expect(401)
});