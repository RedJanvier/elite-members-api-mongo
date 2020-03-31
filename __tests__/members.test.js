import request from 'supertest';
import app from '../app';

describe('[ GET /api/v2/members ] get all members and count', () => {
  afterAll(() => setTimeout(() => process.exit(), 1000));
  it('returns an array of all members', (done) => {
    request(app)
      .get('/api/v2/members')
      .expect('Content-Type', /json/)
      .expect(200, done);
    //   .expect((err, res) => {
    //     if (err) throw err;
    //     expect(res.body).toHaveProperty('total_shares');
    //     expect(res.body).toHaveProperty('total_members');
    //     expect(res.body.total_shares).toBeGreaterThanOrEqual(0);
    //     expect(res.body.total_members).toBeGreaterThanOrEqual(0);
    //     expect(res.body.members).toEqual(expect.any(Array));
    //     expect(res.body.members.length).toBeGreaterThanOrEqual(0);
    //     done();
    //   });
  });
  //   it('returns all members and count members', (done) => {
  //     request(app)
  //       .get('/api/v2/members')
  //       .expect((res) => {
  //         res.body.count.should.be.a('number');
  //         res.body.count.should.be.gte(0);
  //         res.body.users.forEach((member) => {
  //           member.should.be.a('object');
  //           member.should.include.keys(
  //             'id',
  //             'email',
  //             'shares',
  //             'location',
  //             'name',
  //             'img'
  //           );
  //         });
  //         done();
  //       });
  //   });
});

// describe('[ GET /api/v2/members/:id ] get a single member', () => {
//   it('returns an object of the member', (done) => {
//     request(app)
//       .get('/api/v2/members/1')
//       .expect((res) => {
//         res.should.have.status(200);
//         res.body.user.should.be.a('object');
//         done();
//       });
//   });

//   it('returns all details for the  member', (done) => {
//     request(app)
//       .get('/api/v2/members/1')
//       .expect((res) => {
//         res.body.user.should.include.keys(
//           'id',
//           'email',
//           'shares',
//           'location',
//           'name',
//           'img'
//         );
//         done();
//       });
//   });
// });

// describe('[ POST /api/v2/members/signin ] signin member', () => {
//   it('returns an object of with a token', (done) => {
//     request(app)
//       .post('/api/v2/members/signin')
//       .set('Content-Type', 'application/json; charset=utf-8')
//       .send({ email: 'alainyern@gmail.com', password: 'electrotech' })
//       .expect((res) => {
//         res.should.have.status(200);
//         res.body.should.be.a('object');
//         res.body.should.include.keys('success', 'token');
//         res.body.success.should.be.true;
//         done();
//       });
//   });
// });
