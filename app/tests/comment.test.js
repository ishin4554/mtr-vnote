const supertest = require('supertest')
const app = require('../app')
const request = supertest(app)
const mongoose = require('../models/db')
const { initializeDB } = require('../utlis/setup')
const payload = [
  {
    time: '116',
    content: '1111111',
    category: 'question',
    courseId: 1,
    userId: 1,
    parentId: null
  },
  {
    time: '100',
    content: '2222222',
    category: 'note',
    courseId: 1,
    userId: 1,
    parentId: 1
  },
  {
    time: '50',
    content: '3333333',
    category: 'note',
    courseId: 2,
    userId: 1,
    parentId: 1
  }
]
let token = '';

beforeAll( async done => {
  initializeDB(mongoose);
  const userData = {
    email: 'geakii@gmail.com',
    password: '123'
  }
  await request.post('/api/users')
    .send(userData)
    .set('Content-Type', 'application/json')
  const res = await request.post('/api/login')
    .send(userData)
    .set('Content-Type', 'application/json')
  token = res.body.token;
  done();
});

describe('POST /comments', ()=>{
  it('should create a new post', async done => {
    const res = await Promise.all(payload.map(item => {
      return request.post('/api/comments')
        .send(item)
        .set('Content-Type', 'application/json')
        .set('authorization', token)
    }))
    expect(res[2].status).toBe(200);
    expect(res[2].body.message).toBe('success');
    done();
  });
});

describe('GET /comments', ()=>{
  it('should get all comments', async done => {
    const res = await request.get('/api/comments');
    expect(res.status).toBe(200);
    expect(res.body).toHaveLength(3);
    done();
  });

  it('should get course all comments', async done => {
    const res = await request.get('/api/comments?courseId=1');
    expect(res.status).toBe(200);
    expect(res.body).toHaveLength(2);
    done();
  });

  it('should get course all comments with same category', async done => {
    const res = await request.get('/api/comments?courseId=1&category=note');
    expect(res.status).toBe(200);
    expect(res.body).toHaveLength(1);
    done();
  });
});

describe('PATCH /comments/:id', ()=>{
  it('update specific comment', async done => {
    const updatePayload = {
      content: '21212121'
    }
    const res = await request.patch('/api/comments/1')
      .send(updatePayload)
      .set('Content-Type', 'application/json')
      .set('authorization', token);
    
    expect(res.status).toBe(200);
    expect(res.body.message).toBe('success');
    done();
  });
});

describe('DELETE /comments/:id', ()=>{
  it('update specific comment', async done => {
    const res = await request.delete('/api/comments/1')
      .set('authorization', token)
    
    expect(res.status).toBe(200);
    expect(res.body.message).toBe('success');
    done();
  });
});

afterAll(done => {
  mongoose.disconnect();
  return done();
});
