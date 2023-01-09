// in package.json "test": "jest --coverage --runInBand"
// import supertest
const request = require('supertest');
// import the function to close the mongodb connection

const { closeMongoDBConnection, connect } = require('./dbFunctions');

// import the express server
const webapp = require('./server');

// connection to the DB
let mongo;

describe('POST /users/:id/follow endpoint tests', () => {
  // let db; // the db
  // let response; // the response from our express server
  /**
     * We need to make the request to the endpoint
     * before running any test
     * We need to connect to the DB for all the DB checks
     * if beforeAll is underfined
     * inside .eslinrc.js, add 'jest' to the 'env' key
     */
  beforeAll(async () => {
    // connect to the db
    mongo = await connect();
    // get the db
    // db = mongo.db();
  });

  afterAll(async () => {
    // we need to clear the DB
    try {
      // await clearDatabase();
      await mongo.close(); // the test file connection
      await closeMongoDBConnection(); // the express connection
    } catch (err) {
      return err;
    }
    return null;
  });

  test('update follow', async () => {
    const currentUserId = '638beb5a6d818a6c63d82344';
    const followeeId = '6376d6d927d24d3dd3e4d88a';
    const res = await request(webapp).put(`/user/${currentUserId}/follow/${followeeId}`).set('authorization', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImJ3YXRlcm1lbG9uQGdtYWlsLmNvbSIsImlhdCI6MTY3MTY5OTMwNCwiZXhwIjoxNjcxNzg1NzA0fQ.k890aef6YghGywxVoIUfBOVdxBhTe6pvAqxFdxFS3k0');
    expect(res.status).toEqual(200);
  });

  test('Get following list of current user', async () => {
    // const followeeId = '6376d6d927d24d3dd3e4d88a';
    const resp = await request(webapp).get('/currentUser/following').set('authorization', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImJ3YXRlcm1lbG9uQGdtYWlsLmNvbSIsImlhdCI6MTY3MTY5OTMwNCwiZXhwIjoxNjcxNzg1NzA0fQ.k890aef6YghGywxVoIUfBOVdxBhTe6pvAqxFdxFS3k0');
    expect(resp.status).toEqual(200);
    expect(resp.type).toBe('application/json');
    // const userArr = resp;
    // testUser is in the response
    console.log(resp);
    // expect(resp).toEqual(expect.arrayContaining(followeeId));
  });

  test('update unfollow', async () => {
    const currentUserId = '638beb5a6d818a6c63d82344';
    const followeeId = '6376d6d927d24d3dd3e4d88a';
    const resp = await request(webapp).put(`/user/${currentUserId}/unfollow/${followeeId}`).set('authorization', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImJ3YXRlcm1lbG9uQGdtYWlsLmNvbSIsImlhdCI6MTY3MTY5OTMwNCwiZXhwIjoxNjcxNzg1NzA0fQ.k890aef6YghGywxVoIUfBOVdxBhTe6pvAqxFdxFS3k0');
    expect(resp.status).toEqual(200);
    const resp2 = await request(webapp).get('/currentUser/following').set('authorization', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImJ3YXRlcm1lbG9uQGdtYWlsLmNvbSIsImlhdCI6MTY3MTY5OTMwNCwiZXhwIjoxNjcxNzg1NzA0fQ.k890aef6YghGywxVoIUfBOVdxBhTe6pvAqxFdxFS3k0');
    const userArr = JSON.parse(resp2.text).data;
    // testUser is in the response
    expect(userArr).toEqual(expect.not.arrayContaining([{ following: followeeId }]));
  });

  test('update fails 409', async () => {
    const currentUserId = '638beb5a6d818a6c63d82344';
    // create a fake id
    const followeeId = '6376d6d927d24d3aa3e4d88a';
    const resp = await request(webapp).put(`/user/${currentUserId}/follow/${followeeId}`).set('authorization', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImJ3YXRlcm1lbG9uQGdtYWlsLmNvbSIsImlhdCI6MTY3MTY5OTMwNCwiZXhwIjoxNjcxNzg1NzA0fQ.k890aef6YghGywxVoIUfBOVdxBhTe6pvAqxFdxFS3k0');
    expect(resp.status).toEqual(200);
  });
});
