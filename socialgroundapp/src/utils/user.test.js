/* eslint-disable no-underscore-dangle */
// in package.json "test": "jest --coverage --runInBand"
// import supertest
const request = require('supertest');
const { ObjectId } = require('mongodb');
// import the function to close the mongodb connection
// const sgApp = require('../App');

const { closeMongoDBConnection, connect } = require('./dbFunctions');

// import the express server
const webapp = require('./server');

// connection to the DB
let mongo;

describe('POST /users endpoint tests', () => {
  let db; // the db
  let response; // the response from our express server
  let testUserID;
  const testUser = {
    name: 'testuser',
    email: 'user123@gmail.com',
    password: 'test123',
    username: 'user123',
    follower: [],
    following: [],
    suggested: [],
    postCount: 0,
  };
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
    db = mongo.db();
    // send the request to the API and collect the response
    response = await request(webapp).post('/users/')
      .send('name=testuser&email=user123@gmail.com&password=test123&username=user123');
    // eslint-disable-next-line no-underscore-dangle
    testUserID = JSON.parse(response.text).data._id;
  });

  /**
   * removes all testing data from the DB
   */
  const clearDatabase = async () => {
    try {
      const result = await db.collection('users').deleteOne({ name: 'testuser' });
      console.log('result: ', result);
    } catch (err) {
      console.log('error: ', err.message);
    }
  };

  /**
 * After running the tests, we need to remove any test data from the db
 * We need to close the mongoDB connection
 */
  afterAll(async () => {
    // we need to clear the DB
    try {
      await clearDatabase();
      await mongo.close(); // the test file connection
      await closeMongoDBConnection(); // the express connection
    } catch (err) {
      return err;
    }
    return null;
  });

  /**
 * Status code and response type
 */
  test('the status code is 201 and response type', () => {
    expect(response.status).toBe(201); // status code
    expect(response.type).toBe('application/json');
  });

  /**
 * response body
 */
  test('the new user is returned', () => {
    const insertedUser = {
      name: 'testuser', email: 'user123@gmail.com', password: 'test123', username: 'user123', postCount: 0,
    };
    expect(JSON.parse(response.text).data).toMatchObject(insertedUser); // status code
  });

  test('the new user is in the db', async () => {
    const insertedUser = await db.collection('users').findOne({ name: 'testuser' });
    expect(insertedUser.name).toEqual('testuser');
  });

  test('missing a field (email) 404', async () => {
    const res = await request(webapp).post('/users/')
      .send('name=testuser&password=test123&username=user123');
    expect(res.status).toEqual(404);
  });

  test('Get all users endpoint status code and data', async () => {
    const resp = await request(webapp).get('/users/');
    expect(resp.status).toEqual(200);
    expect(resp.type).toBe('application/json');
    const userArr = JSON.parse(resp.text).data;
    // testUser is in the response
    expect(userArr).toEqual(expect.arrayContaining([{ _id: testUserID, ...testUser }]));
  });
  // bad
  test('Get a user endpoint status code and data', async () => {
    const resp = await request(webapp).get(`/user/${testUserID}`);
    expect(resp.status).toEqual(200);
    expect(resp.type).toBe('application/json');
    const userArr = JSON.parse(resp.text).data;
    // testUser is in the response
    expect(userArr).toMatchObject({ _id: testUserID, ...testUser });
  });

  test('user not in db status code 404', async () => {
    const resp = await request(webapp).get('/user/1');
    expect(resp.status).toEqual(404);
    expect(resp.type).toBe('application/json');
  });

  test('Endpoint status code and response async/await', async () => {
    const res = await request(webapp).put(`/user/${testUserID}`)
      .send('password=newpassword123')
      .set('authorization', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImJ3YXRlcm1lbG9uQGdtYWlsLmNvbSIsImlhdCI6MTY3MTY5OTMwNCwiZXhwIjoxNjcxNzg1NzA0fQ.k890aef6YghGywxVoIUfBOVdxBhTe6pvAqxFdxFS3k0');
    expect(res.status).toEqual(200);
    expect(res.type).toBe('application/json');

    // the database was updated
    const updatedUser = await db.collection('users').findOne({ _id: ObjectId(testUserID) });
    expect(updatedUser.password).toEqual('newpassword123');
  });

  test('missing password 404', async () => {
    const res = await request(webapp).put(`/user/${testUserID}`)
      .send('name=hello101')
      .set('authorization', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImJ3YXRlcm1lbG9uQGdtYWlsLmNvbSIsImlhdCI6MTY3MTY5OTMwNCwiZXhwIjoxNjcxNzg1NzA0fQ.k890aef6YghGywxVoIUfBOVdxBhTe6pvAqxFdxFS3k0');
    expect(res.status).toEqual(404);
  });

  test('delete user: status code, type and content', async () => {
  // successful deletion returns 200 status code
    const resp = await request(webapp).delete(`/user/${testUserID}`).set('authorization', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImJ3YXRlcm1lbG9uQGdtYWlsLmNvbSIsImlhdCI6MTY3MTY5OTMwNCwiZXhwIjoxNjcxNzg1NzA0fQ.k890aef6YghGywxVoIUfBOVdxBhTe6pvAqxFdxFS3k0');
    expect(resp.status).toEqual(200);
    expect(resp.type).toBe('application/json');
    // the user is not in the database
    const resp1 = await db.collection('users').findOne({ _id: ObjectId(testUserID) });
    expect(resp1).toBeNull();
  });
  test('wrong user id format/exception - response 404', async () => {
    const resp = await request(webapp).delete('/user/1').set('authorization', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImJ3YXRlcm1lbG9uQGdtYWlsLmNvbSIsImlhdCI6MTY3MTY5OTMwNCwiZXhwIjoxNjcxNzg1NzA0fQ.k890aef6YghGywxVoIUfBOVdxBhTe6pvAqxFdxFS3k0');
    expect(resp.status).toEqual(404);
  });

  test('user id not in system (correct id format) - response 404', async () => {
    const resp = await request(webapp).delete('/user/638a4f8978509ad9412e2fb8').set('authorization', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImJ3YXRlcm1lbG9uQGdtYWlsLmNvbSIsImlhdCI6MTY3MTY5OTMwNCwiZXhwIjoxNjcxNzg1NzA0fQ.k890aef6YghGywxVoIUfBOVdxBhTe6pvAqxFdxFS3k0');
    expect(resp.status).toEqual(404);
  });
});
