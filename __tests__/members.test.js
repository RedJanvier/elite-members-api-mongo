import request from 'supertest';
import mongoose from 'mongoose';
import app from '../app';

describe('[ GET /api/v2/members ] get all members and count', () => {
  beforeAll((done) => {
    jest.setTimeout(30000);
    done();
  });
  afterAll((done) =>
    setTimeout(() => {
      mongoose.connection.close();
      done();
    }, 1000)
  );
  it('returns an array of all members', (done) => {
    request(app)
      .get('/api/v2/members')
      .expect('Content-Type', /json/)
      .expect(200, (err, res) => {
        if (err) throw err;
        expect(res.body).toHaveProperty('total_shares');
        expect(res.body).toHaveProperty('total_members');
        expect(res.body.total_shares).toBeGreaterThanOrEqual(0);
        expect(res.body.total_members).toBeGreaterThanOrEqual(0);
        expect(res.body.members).toEqual(expect.any(Array));
        expect(res.body.members.length).toBeGreaterThanOrEqual(0);
        done();
      });
  });
  it('returns all members and total_members', (done) => {
    request(app)
      .get('/api/v2/members')
      .expect(200, (err, res) => {
        if (err) throw err;
        expect(res.body).toHaveProperty('total_members');
        expect(res.body.total_members).toEqual(expect.any(Number));
        expect(res.body.total_members).toBeGreaterThanOrEqual(0);
        done();
      });
  });
});

// describe('[ GET /api/v2/members/:memberId ] get a single member', () => {
//   beforeAll((done) => {
//     jest.setTimeout(90000);
//     done();
//   });
//   afterAll((done) =>
//     setTimeout(() => {
//       mongoose.connection.close();
//       done();
//     }, 1000)
//   );
//   it('returns an object of the member', (done) => {
//     request(app)
//       .get('/api/v2/members/5e95cca11c9d4400008f1cce')
//       .expect('Content-Type', /json/)
//       .expect(200, (err, res) => {
//         if (err) return console.log('Test Failed', err);
//         console.log(res.body);
//         expect(res.body.user).toEqual(expect.any(Object));
//         expect(res.body.user).toHaveProperty('id');
//         expect(res.body.user).toHaveProperty('email');
//         expect(res.body.user).toHaveProperty('shares');
//         expect(res.body.user).toHaveProperty('location');
//         expect(res.body.user).toHaveProperty('name');
//         expect(res.body.user).toHaveProperty('img');
//         done();
//       });
//   });
// });

// describe('[ POST /api/v2/members/signin ] signin member', () => {
//   beforeAll((done) => {
//     jest.setTimeout(30000);
//     done();
//   });
//   afterAll((done) =>
//     setTimeout(() => {
//       mongoose.connection.close();
//       done();
//     }, 1000)
//   );
//   it('returns an object of with a token', (done) => {
//     request(app)
//       .post('/api/v2/members/signin')
//       .set('Content-Type', 'application/json; charset=utf-8')
//       .send({ email: 'alainyern@gmail.com', password: 'electrotech' })
//       .expect(200, (err, res) => {
//         expect(res.body).toEqual(expect.any(Object));
//         expect(res.body).toHaveProperty('success');
//         expect(res.body).toHaveProperty('token');
//         expect(res.body.success).toEqual(expect.any(Boolean));
//         expect(res.body.success).toBeTruthy();
//         done();
//       });
//   });
// });
