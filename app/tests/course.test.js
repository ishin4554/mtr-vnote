const supertest = require('supertest')
const app = require('../app')
const request = supertest(app)
const mongoose = require('../models/db')
const payload = [
  {
    url: 'https://www.youtube.com/watch?v=0kZ3ix3j5Ik',
    title: 'test111',
    description: '人在山的跟朋，時候回到就先走得，墨子空虛故事頭的。篇原我們有沒。',
    folderId: 1,
    updatedAt: Date.now,
    userId: 1
  },
  {
    url: 'https://www.youtube.com/watch?v=njlABvVRB68',
    title: 'test222',
    description: '真的我不，接著山的兩個問問像也系統，停止我忘腦袋的玩的一，部',
    folderId: 1,
    updatedAt: Date.now,
    userId: 1
  },
  {
    url: 'https://www.youtube.com/watch?v=-P1kAZxbD80',
    title: 'test333',
    description: '的，圖片牙齒掉了是開狀況的名。可以忘卻社團才會有些兩眼時常，出了好像沒用在家奶奶要一，發噗認真拿到臉色可以，更新靈',
    folderId: 2,
    updatedAt: Date.now,
    userId: 2
  },
]

beforeAll(done => {
  for (var i in mongoose.connection.collections) {
    mongoose.connection.collections[i].remove(function() {});
  }
  done();
});

describe('POST /course', ()=>{
  it('should create a new course', async done => {
    const res = await Promise.all(payload.map(item => {
      return request.post('/api/courses')
        .send(item)
        .set('Content-Type', 'application/json')
    }))
    expect(res[2].status).toBe(200);
    expect(res[2].body.message).toBe('success');
    done();
  });
});

describe('GET /courses', ()=>{
  it('should get all courses', async done => {
    const res = await request.get('/api/courses');
    expect(res.status).toBe(200);
    expect(res.body).toHaveLength(3);
    done();
  });

  it('should get specific course', async done => {
    const res = await request.get('/api/courses/1');
    expect(res.status).toBe(200);
    expect(res.body.id).toBe(1);
    done();
  });

  it('should get user all course', async done => {
    const res = await request.get('/api/courses?userId=1');
    expect(res.status).toBe(200);
    expect(res.body).toHaveLength(2);
    done();
  });
});

afterAll(done => {
  mongoose.disconnect();
  return done();
});
