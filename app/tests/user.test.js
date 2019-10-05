const supertest = require('supertest')
const app = require('../app')
const request = supertest(app)
const mongoose = require('../models/db')
const STATE = require('../constants/state')
const { checkAuth } = require('../middlewares/auth')
const { initializeDB } = require('../utlis/setup')

const payload = {
    nickname: 'geakii',
    email: 'geakii@gmail.com',
    password: '123'
  }


beforeAll(done => {
  initializeDB(mongoose)
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
  let token;
  it('should login', async done => {
    const res = await request.post('/api/login')
        .send(({
          email: payload.email,
          password: payload.password,
        }))
        .set('Content-Type', 'application/json')

    expect(res.status).toBe(200);
    expect(res.body.token).toBeDefined();
    token = res.body.token;
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

  it('should check auth middlewares work', async done => {
    const req = { headers: { authorization: token }};
    const next = jest.fn();
    const res = {};

    await checkAuth(req, res, next)

    expect(next).toHaveBeenCalled();
    done();
  });
});

afterAll(done => {
  mongoose.disconnect();
  return done();
});
