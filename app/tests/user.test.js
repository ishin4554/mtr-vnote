const supertest = require('supertest')
const app = require('../app')
const request = supertest(app)
const mongoose = require('../models/db')
const STATE = require('../constants/state')
const payload = {
    nickname: 'geakii',
    email: 'geakii@gmail.com',
    password: '123'
  }


beforeAll(done => {
  for (var i in mongoose.connection.collections) {
    mongoose.connection.collections[i].remove(function() {});
  }
  done();
});

describe('POST /users', ()=>{
  it('should register a new course', async done => {
    const res = await request.post('/api/users')
        .send(payload)
        .set('Content-Type', 'application/json')

    expect(res.status).toBe(200);
    expect(res.body.message).toBe('success');
    done();
  });

  it('should register error with same email', async done => {
    const res = await request.post('/api/users')
        .send(payload)
        .set('Content-Type', 'application/json')

    expect(res.status).toBe(403);
    expect(res.body.message).toBe(STATE.FAIL.EMAIL_ERR.message);
    done();
  });
});

describe('POST /login', ()=>{
  it('should login', async done => {
    const res = await request.post('/api/login')
        .send(({
          email: payload.email,
          password: payload.password,
        }))
        .set('Content-Type', 'application/json')

    expect(res.status).toBe(200);
    expect(res.body.token).toBeDefined();
    done();
  });

  it('should not login with wrong password', async done => {
    const res = await request.post('/api/login')
        .send(({
          email: payload.email,
          password: 'jkjkjk',
        }))
        .set('Content-Type', 'application/json')

    expect(res.status).toBe(403);
    expect(res.body.message).toBe(STATE.FAIL.PASSWORD_ERR.message);
    done();
  });

  it('should not login with no email', async done => {
    const res = await request.post('/api/login')
        .send(({
          email: 'jkjkjkjk',
          password: payload.password,
        }))
        .set('Content-Type', 'application/json')

    expect(res.status).toBe(403);
    expect(res.body.message).toBe(STATE.FAIL.NOLOGIN_ERR.message);
    done();
  });
});

afterAll(done => {
  mongoose.disconnect();
  return done();
});
