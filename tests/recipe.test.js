const request = require('supertest');
const app = require('../app');
const Recipe = require('../api/models/Recipe');
const { clearDatabase } = require('./fixtures/db');

beforeAll(async () => {
  const response = await request(app)
    .post('/users/signup')
    .set('Content-Type', 'application/json')
    .send({
      name: 'Tim',
      email: 'tim1@example.com',
      password: 'MyPassword888!'
    }).expect(201);

  userTokens.push(response.body.token);
});

afterAll(clearDatabase);

const userTokens = [];

test('Should create recipe for user', async () => {
  const response = await request(app)
    .post('/recipes')
    .set('Authorization', `Bearer ${userTokens[0]}`)
    .send({
      title: 'From my test',
      recipePath: 'www.samplerecipepath.com'
    })
    .expect(201)
  const recipe = await Recipe.findById(response.body._id)
  expect(recipe).not.toBeNull();
  expect(recipe.haveCooked).toBe(false);
});

test('Should fetch user recipes', async () => {
  const response = await request(app)
    .get('/recipes')
    .set('Authorization', `Bearer ${userTokens[0]}`)
    .send()
    .expect(200)
  expect(response.body.length).toBe(1);
});
