const request = require('supertest');
const app = require('../app');
const mongoose = require('mongoose');
const userModel = require('../userModel');

describe('User API', () => {
  beforeAll(async () => {
    await mongoose.connect('mongodb://localhost:27017/test', {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
  });

  afterAll(async () => {
    await mongoose.connection.close();
  });

  afterEach(async () => {
    await userModel.deleteMany({});
  });

  describe('POST /adding', () => {
    it('should add a new user', async () => {
      const res = await request(app)
        .post('/adding')
        .send({
          first: 'John',
          last: 'Doe',
          email: 'john.doe@example.com',
          company: 'Acme Inc.',
          country: 'USA',
        });

      expect(res.status).toBe(200);
      expect(res.text).toBe('User added successfully');

      const user = await userModel.findOne({ email: 'john.doe@example.com' });
      expect(user).not.toBeNull();
      expect(user.first).toBe('John');
    });
  });

  describe('GET /list', () => {
    beforeEach(async () => {
      await userModel.create({
        first: 'John',
        last: 'Doe',
        email: 'john.doe@example.com',
        company: 'Acme Inc.',
        country: 'USA',
      });
      await userModel.create({
        first: 'Jane',
        last: 'Doe',
        email: 'jane.doe@example.com',
        company: 'Acme Inc.',
        country: 'USA',
      });
    });

    it('should get all users', async () => {
      const res = await request(app).get('/list');

      expect(res.status).toBe(200);
      expect(res.body.users).toHaveLength(2);
    });

    it('should get users with pagination', async () => {
      const res = await request(app).get('/list?pageSize=1&page=2');

      expect(res.status).toBe(200);
      expect(res.body.users).toHaveLength(1);
      expect(res.body.totalPages).toBe(2);
      expect(res.body.currentPage).toBe(2);
      expect(res.body.totalUsers).toBe(2);
    });
  });

  describe('GET /obtaindatauser/:userId', () => {
    it('should get user data by ID', async () => {
      const user = await userModel.create({
        first: 'John',
        last: 'Doe',
        email: 'john.doe@example.com',
        company: 'Acme Inc.',
        country: 'USA',
      });

      const res = await request(app).get(`/obtaindatauser/${user._id}`);

      expect(res.status).toBe(200);
      expect(res.body.email).toBe('john.doe@example.com');
    });

    it('should return 404 if user is not found', async () => {
      const res = await request(app).get(`/obtaindatauser/${mongoose.Types.ObjectId()}`);

      expect(res.status).toBe(404);
      expect(res.text).toBe('User not found');
    });
    });
});