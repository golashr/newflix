process.env.NODE_ENV = 'test';

const expect = require('chai').expect;
const request = require('supertest');

const app = require('../../../index.js');
const conn = require('../../../components/db.js');
const logger = require('../../../logger/logger.js');

describe('GET /movie/movies', () => {
  before(done => {
    logger.info('[+] before');
    conn
      .connect()
      .then(() => done())
      .catch(err => done(err));
  });

  after(done => {
    logger.info('[+] after');
    conn
      .close()
      .then(() => done())
      .catch(err => done(err));
  });

  it('OK, getting movies has no movies', done => {
    logger.info('[+] Inside test');
    request(app)
      .get('/movie/movies')
      .then(res => {
        const body = res.body;
        expect(body.length).to.equal(0);
        done();
      })
      .catch(err => done(err));
  });

  // it('OK, getting notes has 1 movie', done => {
  //   request(app)
  //     .post('/movie/getmovie')
  //     .send({
  //       ID: 6,
  //       title: 'Fast and Furious',
  //       description: 'Ms. Nowhere sends someone to snoop on Shashis mansion.',
  //       charges: '6',
  //       imageUrl: '/img/logo/golang.png',
  //       owner: 'Film World',
  //       broadcaster: '',
  //     })
  //     .then(res => {
  //       request(app)
  //         .get('/movie/movies')
  //         .then(res => {
  //           const body = res.body;
  //           expect(body.length).to.equal(1);
  //           done();
  //         });
  //     })
  //     .catch(err => done(err));
  // });
});
